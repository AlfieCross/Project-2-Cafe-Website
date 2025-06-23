// script.js

// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
  
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent actual form submission (for demo purposes)
  
        // Get form input values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
  
        // Simple validation check
        if (name && email && message) {
          alert("Thank you for your message, " + name + "! We'll get back to you soon.");
          contactForm.reset();
        } else {
          alert("Please fill in all fields before submitting the form.");
        }
      });
    }

});
