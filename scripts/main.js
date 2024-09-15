// scripts/main.js

let wakeLock = null;
let timerDuration = 0; // Duration in milliseconds

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
async function requestWakeLock(duration) {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active');

        showCustomNotification('Wake Lock is active. Your screen will stay awake.');

        // Set timer to release wake lock after the specified duration
        setTimeout(() => {
            releaseWakeLock();
        }, duration);
        
        // Listen for the release event
        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock was released');
            showCustomNotification('Wake Lock was released. Your screen may turn off.');
        });

    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
        showCustomNotification('Failed to activate Wake Lock.');
    }
}

// Function to release the wake lock
async function releaseWakeLock() {
    if (wakeLock !== null) {
        await wakeLock.release();
        wakeLock = null;
    }
}

// Function to show custom notifications
function showCustomNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
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
    const durationInput = document.getElementById('durationInput');
    const durationValue = parseInt(durationInput.value);

    if (isNaN(durationValue) || durationValue < 1 || durationValue > 180) {
        alert('Please enter a valid duration between 1 and 180 minutes.');
        return;
    }

    // Convert minutes to milliseconds
    timerDuration = durationValue * 60 * 1000;

    // Request wake lock for the specified duration
    if ('wakeLock' in navigator) {
        requestWakeLock(timerDuration);
    } else {
        console.warn('Wake Lock API not supported by this browser.');
        showCustomNotification('Wake Lock API not supported. Please use a supported browser for optimal functionality.');
    }

    // Redirect to activate.html with duration as query parameter
    window.location.href = `activate.html?duration=${durationValue}`;
}

// Enable activation button when checkbox is checked
document.addEventListener('DOMContentLoaded', function() {
    const agreeCheckbox = document.getElementById('agree');
    const activateBtn = document.getElementById('activateBtn');
    const durationInput = document.getElementById('durationInput');

    if (agreeCheckbox && activateBtn) {
        agreeCheckbox.addEventListener('change', function() {
            activateBtn.disabled = !this.checked;
        });
    }

    // Set default duration to 60 minutes
    if (durationInput) {
        durationInput.value = 60;
    }
});
