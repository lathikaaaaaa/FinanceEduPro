// Function to show the selected module
function showModule(moduleNumber) {
    // Hide all modules
    var modules = document.querySelectorAll('.module');
    modules.forEach(function(module) {
        module.style.display = 'none';
    });

    // Show the selected module
    document.getElementById('module-' + moduleNumber).style.display = 'block';
}

// Basic alert when a video link is clicked
document.querySelectorAll('.video-link').forEach(link => {
    link.addEventListener('click', function() {
        alert(You are about to view: ${this.textContent});
    });
});

// Display a confirmation dialog before navigating to the video
document.querySelectorAll('.video-link').forEach(link => {
    link.addEventListener('click', function(event) {
        const confirmation = confirm(Are you sure you want to watch this video: ${this.textContent}?);
        if (!confirmation) {
            event.preventDefault(); // Prevents the link from being followed
        }
    });
});

// Example: Handling clicks on navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action
        alert('This is a placeholder for navigation functionality.');
    });
});

document.getElementById('language-select').addEventListener('change', function () {
    if (this.value === 'ta') {
        document.querySelectorAll('[id$="-en"]').forEach(function (el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('[id$="-ta"]').forEach(function (el) {
            el.style.display = 'block';
            el.classList.add('ta'); // Add class to apply Tamil-specific styles
        });
    } else {
        document.querySelectorAll('[id$="-ta"]').forEach(function (el) {
            el.style.display = 'none';
            el.classList.remove('ta'); // Remove class to revert to default styles
        });
        document.querySelectorAll('[id$="-en"]').forEach(function (el) {
            el.style.display = 'block';
        });
    }
});
