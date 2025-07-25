document.addEventListener("DOMContentLoaded", () => {

  // ==================================
  // 1. Hamburger Menu (Mobile Nav)
  // ==================================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburger.focus();
      });
    });
  }

  // ==================================
  // 2. Contact Form Submission
  // ==================================
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

  // ==================================
  // 3. Shopping Cart Logic
  // ==================================
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
        <button class="remove" data-index="${i}" aria-label="Remove ${item.name}">✕</button>
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
      cart.push({
        name,
        price: parseFloat(price),
        quantity: 1
      });
    }

    alert(`${name} added to cart!`);
    renderCart();
  };

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const {
        name,
        price
      } = btn.dataset;
      if (name && price) addToCart(name, price);
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
        cartPanel.classList.add("open");
        renderCart();
      }
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartPanel.classList.remove("open");
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        cart.length = 0;
        renderCart();
        cartPanel.classList.remove("open");
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
      } else {
        alert("Thank you for your order! This is a demo — no payment processed.");
        cart.length = 0;
        renderCart();
        cartPanel.classList.remove("open");
      }
    });
  }

  renderCart(); // Initial load
});