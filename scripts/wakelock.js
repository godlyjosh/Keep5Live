// scripts/main.js

let wakeLock = null;

// Function to request Wake Lock
async function activateKeep5Live() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active, system will not go idle.');

        alert('Keep5Live activated! Your system will stay awake.');
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
        alert('Error: Unable to activate Keep5Live.');
    }
}

// Function to release Wake Lock (optional, can be tied to session end)
async function releaseWakeLock() {
    if (wakeLock !== null) {
        await wakeLock.release();
        console.log('Wake Lock released.');
        wakeLock = null;
    }
}

// Automatically try to release the lock when user navigates away (optional)
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && wakeLock !== null) {
        releaseWakeLock();
    }
});
