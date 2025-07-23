document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

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

  // Expandable menu card panels
  const menuCards = document.querySelectorAll(".menu-card");

  menuCards.forEach((card) => {
    card.addEventListener("click", () => {
      const panel = card.nextElementSibling;

      // Close all other panels
      document.querySelectorAll(".expandable-panel").forEach((p) => {
        if (p !== panel) p.classList.remove("open");
      });

      // Toggle this panel
      panel.classList.toggle("open");

      // Accessibility: toggle aria-expanded
      const isOpen = panel.classList.contains("open");
      card.setAttribute("aria-expanded", isOpen);
    });
  });

  // Shopping Cart Functionality
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price: parseFloat(price), quantity: 1 });
    }

    updateCartStorage();
    alert(`${name} added to cart!`);
    updateCartDisplay();
  }

  // Add event listeners to all Add to Cart buttons
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = button.dataset.price;
      addToCart(name, price);
    });
  });

  // Cart DOM Elements
  const cartButton = document.getElementById("cart-button");
  const cartPanel = document.getElementById("cart-panel");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const closeCartBtn = document.getElementById("close-cart");
  const cartCount = document.getElementById("cart-count");
  const clearBtn = document.getElementById("clear-cart");
  const checkoutBtn = document.getElementById("checkout");

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

  // Remove item from cart
  if (cartItemsList) {
    cartItemsList.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCartDisplay();
      }
    });
  }

  // Toggle cart panel open/close
  if (cartButton) {
    cartButton.addEventListener("click", () => {
      cartPanel.style.display = "block";
      updateCartDisplay();
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartPanel.style.display = "none";
    });
  }

  // Clear cart
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        cart.length = 0;
        updateCartDisplay();
        cartPanel.style.display = "none";
      }
    });
  }

  // Fake checkout
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

  // On initial page load
  updateCartDisplay();
});
