// scripts/timer.js

let startTime = Date.now();
let timerInterval;

// Function to format time (HH:MM:SS)
function formatTime(duration) {
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0')
    );
}

// Function to update the timer every second
function updateTimer(duration) {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;

    const formattedTime = formatTime(elapsed);
    document.getElementById('timerText').textContent = formattedTime;

    // Update circular progress
    const progressCircle = document.querySelector('.timer-progress');
    const totalSeconds = duration / 1000; // Total duration in seconds
    const elapsedSeconds = Math.floor(elapsed / 1000);
    const percentage = elapsedSeconds / totalSeconds;
    const offset = 565.48 * (1 - percentage); // 2 * PI * 90 ≈ 565.48

    progressCircle.style.strokeDashoffset = offset;

    // Stop timer when duration is reached
    if (elapsed >= duration) {
        clearInterval(timerInterval);
        showCustomNotification('Keep5Live session ended. Your system may lock now.');
        window.location.href = 'index.html'; // Redirect to homepage
    }
}

// Initialize the timer
function initTimer() {
    const urlParams = new URLSearchParams(window.location.search);
    const duration = parseInt(urlParams.get('duration')) * 60 * 1000; // Duration in milliseconds

    if (isNaN(duration) || duration < 60000 || duration > 18000000) { // 1 minute to 3 hours
        alert('Invalid duration. Redirecting to homepage.');
        window.location.href = 'index.html';
        return;
    }

    timerInterval = setInterval(() => {
        updateTimer(duration);
    }, 1000);
}

// Start the timer on page load
window.onload = initTimer;
