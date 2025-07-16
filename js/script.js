// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission handling
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        contactForm.reset();
      } else {
        alert("Please fill in all fields before submitting.");
      }
    });
  }

  // Hamburger Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Expand/collapse menu panels on click
  const menuCards = document.querySelectorAll(".menu-card");

  menuCards.forEach((card) => {
    card.addEventListener("click", () => {
      const panel = card.nextElementSibling;

      // Close all open panels
      document.querySelectorAll(".expandable-panel").forEach((p) => {
        if (p !== panel) p.classList.remove("open");
      });

      // Toggle current panel
      panel.classList.toggle("open");
    });
  });
});
