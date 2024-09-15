// scripts/timer.js

let startTime = Date.now();

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
function updateTimer() {
    const currentTime = Date.now();
    const duration = currentTime - startTime;

    const formattedTime = formatTime(duration);
    document.getElementById('timerText').textContent = formattedTime;

    // Update circular progress
    const progressCircle = document.querySelector('.timer-progress');
    const totalSeconds = 86400; // 24 hours in seconds
    const elapsedSeconds = Math.floor(duration / 1000);
    const percentage = (elapsedSeconds % totalSeconds) / totalSeconds;
    const offset = 439.82 * (1 - percentage); // 2 * Math.PI * r = 2 * 3.14 * 70 ≈ 439.82

    progressCircle.style.strokeDashoffset = offset;
}

// Start the timer and update every second
setInterval(updateTimer, 1000);
