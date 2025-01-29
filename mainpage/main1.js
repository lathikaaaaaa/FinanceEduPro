// Handling category navigation
document.getElementById("teens").addEventListener("click", function() {
    window.location.href = "teens.html";
});

document.getElementById("working-professional").addEventListener("click", function() {
    window.location.href = "working_professional.html";
});

document.getElementById("home-maker").addEventListener("click", function() {
    window.location.href = "home_maker.html";
});

// Function to change the language
function changeLanguage(language) {
    const elements = document.querySelectorAll('[data-lang-en]');
    elements.forEach(element => {
        if (language === 'ta') {
            element.textContent = element.getAttribute('data-lang-ta');
        } else {
            element.textContent = element.getAttribute('data-lang-en');
        }
    });
}

// Handling language selection
document.querySelector(".language-select").addEventListener("change", function() {
    const language = this.value;
    changeLanguage(language);
});

// Optional: Set default language based on user preference or browser setting
window.addEventListener('load', function() {
    const userLang = navigator.language || navigator.userLanguage; 
    const languageSelect = document.querySelector('.language-select');
    if (userLang.includes('ta')) {
        languageSelect.value = 'ta';
        changeLanguage('ta');
    } else {
        languageSelect.value = 'en';
        changeLanguage('en');
    }
});

document.getElementById('open-chatbot').addEventListener('click', function() {
    var chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
        chatbotContainer.style.display = 'block';
    } else {
        chatbotContainer.style.display = 'none';
    }
});
