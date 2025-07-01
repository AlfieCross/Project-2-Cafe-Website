// script.js

// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Contact Form Submission
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

  // Menu Filter Functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      // Update active button
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Show/hide cards
      menuCards.forEach(card => {
        if (category === "all" || card.classList.contains(category)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Expandable Panels (Coffee, Drinks, Snacks)
  const menuToggles = [
    { cardId: "coffee-card", panelId: "coffee-panel" },
    { cardId: "drinks-card", panelId: "drinks-panel" },
    { cardId: "snacks-card", panelId: "snacks-panel" }
  ];

  menuToggles.forEach(({ cardId, panelId }) => {
    const card = document.getElementById(cardId);
    const panel = document.getElementById(panelId);

    if (card && panel) {
      card.addEventListener("click", () => {
        const isVisible = panel.style.display === "block";

        // Hide all other panels
        menuToggles.forEach(({ panelId: otherPanelId }) => {
          const otherPanel = document.getElementById(otherPanelId);
          if (otherPanel && otherPanel !== panel) {
            otherPanel.style.display = "none";
          }
        });

        // Toggle current
        panel.style.display = isVisible ? "none" : "block";
      });
    }
  });
});
