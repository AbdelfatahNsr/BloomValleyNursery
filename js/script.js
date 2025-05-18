document.addEventListener("DOMContentLoaded", () => {
    // Responsive Navigation (Hamburger Menu)
    const menuToggle = document.createElement("button");
    menuToggle.classList.add("menu-toggle");
    menuToggle.innerHTML = "&#9776;"; // Hamburger icon
    const nav = document.querySelector("header nav");
    if (nav) {
        nav.parentNode.insertBefore(menuToggle, nav);
        const navUl = nav.querySelector("ul");
        if (navUl) {
            menuToggle.addEventListener("click", () => {
                navUl.classList.toggle("active");
            });
        }
    }

    // Shopping Cart Functionality
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const cartModal = document.getElementById("cart-modal");
    const viewCartButton = document.getElementById("view-cart-button");
    const closeButton = document.querySelector(".modal .close-button");
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartTotalSpan = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart-button");
    const processOrderButton = document.getElementById("process-order-button");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

    function updateCartDisplay() {
        if (!cartItemsContainer || !cartTotalSpan) return;
        cartItemsContainer.innerHTML = ""; // Clear previous items
        let total = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        }
        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `<span>${item.name}</span><span>$${parseFloat(item.price).toFixed(2)}</span>`;
            cartItemsContainer.appendChild(itemElement);
            total += parseFloat(item.price);
        });
        cartTotalSpan.textContent = total.toFixed(2);
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const itemName = e.target.dataset.itemName;
                const itemPrice = e.target.dataset.itemPrice;
                cart.push({ name: itemName, price: itemPrice });
                updateCartDisplay();
                alert("Item added."); // Requirement 2c
            });
        });
    }

    if (viewCartButton) {
        viewCartButton.addEventListener("click", () => {
            if (cartModal) {
                updateCartDisplay();
                cartModal.style.display = "block";
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            if (cartModal) cartModal.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (cartModal && event.target == cartModal) {
            cartModal.style.display = "none";
        }
    });

    if (clearCartButton) {
        clearCartButton.addEventListener("click", () => {
            cart = [];
            updateCartDisplay();
        });
    }

    if (processOrderButton) {
        processOrderButton.addEventListener("click", () => {
            alert("Thank you for your order."); // Requirement 2c
            cart = []; // Optionally clear cart after processing
            updateCartDisplay();
            if (cartModal) cartModal.style.display = "none";
        });
    }

    // Web Form (About Us Page) - Requirement 2b
    const feedbackForm = document.getElementById("client-feedback-form");
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                type: e.target["feedback-type"].value,
                message: e.target.message.value,
                timestamp: new Date().toISOString()
            };
            // Save to localStorage
            let submissions = JSON.parse(localStorage.getItem("formSubmissions")) || [];
            submissions.push(formData);
            localStorage.setItem("formSubmissions", JSON.stringify(submissions));
            alert("Thank you for your feedback/order request!");
            feedbackForm.reset();
        });
    }
    
    // Newsletter form submissions (simple alert, no storage specified)
    const newsletterForms = document.querySelectorAll("form[id^=\"newsletter-form\"]");
    newsletterForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for subscribing to our newsletter!");
            form.reset();
        });
    });

    // Initial cart display update if on a page with cart elements (e.g. gallery)
    if (document.getElementById("gallery-grid")) { // Check if on gallery page
        updateCartDisplay();
    }
});

