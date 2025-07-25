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

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburger.focus(); // Return focus to hamburger for accessibility
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
  document.querySelectorAll(".menu-card").forEach((card) => {
    card.addEventListener("click", () => {
      const panel = card.nextElementSibling;

      document.querySelectorAll(".expandable-panel").forEach((p) => {
        if (p !== panel) p.classList.remove("open");
      });

      panel.classList.toggle("open");
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

  const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

  const renderCart = () => {
    if (!cartItemsList || !cartTotal || !cartCount) return;

    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
      cartTotal.textContent = "0.00";
      cartCount.textContent = "0";
      saveCart();
      return;
    }

    let total = 0;

    cart.forEach((item, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)}
        <button class="remove" data-index="${i}">✕</button>
      `;
      cartItemsList.appendChild(li);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    saveCart();
  };

  const addToCart = (name, price) => {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price: parseFloat(price), quantity: 1 });
    }

    alert(`${name} added to cart!`);
    renderCart();
  };

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { name, price } = btn.dataset;
      addToCart(name, price);
    });
  });

  if (cartItemsList) {
    cartItemsList.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        renderCart();
      }
    });
  }

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty.");
      } else {
        cartPanel.style.display = "block";
        renderCart();
      }
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartPanel.style.display = "none";
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        cart.length = 0;
        renderCart();
        cartPanel.style.display = "none";
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
      } else {
        alert("Thank you for your order! This is a demo, so no payment was processed.");
        cart.length = 0;
        renderCart();
        cartPanel.style.display = "none";
      }
    });
  }

  renderCart();
});
