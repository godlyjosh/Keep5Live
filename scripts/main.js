// Function to open the pop-up
function openPopup() {
    document.getElementById('popup').style.display = 'block';
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
