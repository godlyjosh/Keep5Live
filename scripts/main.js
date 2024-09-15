// scripts/main.js

let wakeLock = null;

// Function to open the pop-up
function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}

// Function to close the pop-up when clicking outside the content
window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}

// Function to request a wake lock
async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active');

        // Listen for the release event
        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock was released');
            showCustomNotification('Wake Lock was released. Your screen may turn off.');
        });

        showCustomNotification('Wake Lock is active. Your screen will stay awake.');
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
        showCustomNotification('Failed to activate Wake Lock.');
    }
}

// Function to show custom notifications
function showCustomNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    // Append to body
    document.body.appendChild(notification);
    
    // Trigger the show class to start animations
    setTimeout(() => {
        notification.classList.add('show');
    }, 100); // Slight delay to allow for CSS transition
    
    // Remove notification after animation
    setTimeout(() => {
        notification.classList.remove('show');
        // Remove from DOM after transition
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000); // Display for 5 seconds
}

// Function to activate Keep5Live
function activateKeep5Live() {
    // Request wake lock
    if ('wakeLock' in navigator) {
        requestWakeLock();
    } else {
        console.warn('Wake Lock API not supported by this browser.');
        showCustomNotification('Wake Lock API not supported. Please use a supported browser for optimal functionality.');
    }

    // Redirect to activate.html
    window.location.href = 'activate.html';
}

// Enable activation button when checkbox is checked
document.addEventListener('DOMContentLoaded', function() {
    const agreeCheckbox = document.getElementById('agree');
    const activateBtn = document.getElementById('activateBtn');

    if (agreeCheckbox && activateBtn) {
        agreeCheckbox.addEventListener('change', function() {
            activateBtn.disabled = !this.checked;
        });
    }
});
