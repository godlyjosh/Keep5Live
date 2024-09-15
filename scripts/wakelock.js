// scripts/wakelock.js

let wakeLock = null;

// Function to request a wake lock
async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active');

        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock was released');
        });
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

// Request wake lock when the page loads
window.addEventListener('load', () => {
    if ('wakeLock' in navigator) {
        requestWakeLock();
    } else {
        console.warn('Wake Lock API not supported by this browser.');
    }
});

// Re-request wake lock when the page becomes visible again
document.addEventListener('visibilitychange', () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
    }
});
