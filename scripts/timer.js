// Timer functionality
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

    document.getElementById('timer').textContent = formatTime(duration);
}

// Start the timer and update every second
setInterval(updateTimer, 1000);
