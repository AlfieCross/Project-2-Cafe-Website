document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // Hamburger Menu Toggle
  // ================================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    // Close menu on nav link click (for mobile)
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  // ================================
  // Contact Form Submission
  // ================================
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

  // ================================
  // Expandable Menu Cards
  // ================================
  const menuCards = document.querySelectorAll(".menu-card");

  menuCards.forEach((card) => {
    card.addEventListener("click", () => {
      const panel = card.nextElementSibling;

      // Close other panels
      document.querySelectorAll(".expandable-panel").forEach((otherPanel) => {
        if (otherPanel !== panel) {
          otherPanel.classList.remove("open");
        }
      });

      // Toggle current panel
      panel.classList.toggle("open");

      // Update ARIA
      card.setAttribute("aria-expanded", panel.classList.contains("open"));
    });
  });

  // ================================
  // Shopping Cart Logic
  // ================================
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartButton = document.getElementById("cart-button");
  const cartPanel = document.getElementById("cart-panel");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const closeCartBtn = document.getElementById("close-cart");
  const clearBtn = document.getElementById("clear-cart");
  const checkoutBtn = document.getElementById("checkout");

  function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartDisplay() {
    if (!cartItemsList || !cartTotal || !cartCount) return;

    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
      cartTotal.textContent = "0.00";
      cartCount.textContent = "0";
      updateCartStorage();
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)}
        <button class="remove" data-index="${index}">✕</button>
      `;
      cartItemsList.appendChild(li);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    updateCartStorage();
  }

  function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price: parseFloat(price), quantity: 1 });
    }

    updateCartStorage();
    alert(`${name} added to cart!`);
    updateCartDisplay();
  }

  // Add-to-Cart Buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = button.dataset.price;
      addToCart(name, price);
    });
  });

  // Cart Remove Button
  if (cartItemsList) {
    cartItemsList.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCartDisplay();
      }
    });
  }

  // Open Cart Panel
  if (cartButton) {
    cartButton.addEventListener("click", () => {
      cartPanel.style.display = "block";
      updateCartDisplay();
    });
  }

  // Close Cart Panel
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartPanel.style.display = "none";
    });
  }

  // Clear Cart
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        cart.length = 0;
        updateCartDisplay();
        cartPanel.style.display = "none";
      }
    });
  }

  // Checkout (Fake)
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
      } else {
        alert("Thank you for your order! This is a demo, so no payment was processed.");
        cart.length = 0;
        updateCartDisplay();
        cartPanel.style.display = "none";
      }
    });
  }

  // Initial Render
  updateCartDisplay();
});
