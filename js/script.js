document.addEventListener("DOMContentLoaded", () => {
  // Contact Form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        contactForm.reset();
      } else {
        alert("Please fill in all fields before submitting the form.");
      }
    });
  }

  // Expandable Menu Cards
  const menuCards = document.querySelectorAll(".menu-card");
  const panels = document.querySelectorAll(".expandable-panel");

  menuCards.forEach((card) => {
    card.addEventListener("click", () => {
      const panel = card.nextElementSibling;

      if (panel.classList.contains("open")) {
        panel.classList.remove("open");
      } else {
        panels.forEach((p) => p.classList.remove("open"));
        panel.classList.add("open");
      }
    });
  });
});
