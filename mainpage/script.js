function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    // Optionally, you can add form validation logic here

    // Redirect to the main page
    window.location.href = 'main.html'; // Change this if the main page is in a different location
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    document.querySelector('.toggle-password').textContent = type === 'password' ? 'Show' : 'Hide';
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        const langSelect = document.querySelector('.goog-te-combo');
        if (langSelect) {
            langSelect.value = savedLanguage;
            langSelect.dispatchEvent(new Event('change'));
        }
    }
});
