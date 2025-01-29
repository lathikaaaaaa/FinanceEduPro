function handleSignUp(event) {
    event.preventDefault(); // Prevent the default form submission



    // Redirect to the login page
    window.location.href = 'main.html'; 
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    document.querySelector('.toggle-password').textContent = type === 'password' ? 'Show' : 'Hide';
}