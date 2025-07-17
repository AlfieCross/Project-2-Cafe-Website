document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Contact form submission
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

  // Menu card expand/collapse
  const menuCards = document.querySelectorAll(".menu-card");
  menuCards.forEach((card) => {
    card.addEventListener("click", () => {
      const panel = card.nextElementSibling;
      document.querySelectorAll(".expandable-panel").forEach((p) => {
        if (p !== panel) p.classList.remove("open");
      });
      panel.classList.toggle("open");
    });
  });
});
