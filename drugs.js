document.addEventListener('DOMContentLoaded', function() {
    // Sample drug data
     const drugs = [
        { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotics', price: 15.00, stock: 25, image: 'amoxicillin.jpg' },
        { id: 2, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 5.00, stock: 50, image: 'paracetamol.jpg' },
        { id: 3, name: 'Ibuprofen 400mg', category: 'Pain Relief', price: 8.00, stock: 30, image: 'ibuprofen.jpg' },
        { id: 4, name: 'Cyprodine', category: 'Appetite Booster', price: 120.00, stock: 7, image: 'cyprodine.jpg' },
        { id: 5, name: 'Dove spray', category: 'Body spray', price: 55.00, stock: 15, image: 'dove.jpg' },
        { id: 6, name: 'Femister', category: 'Dietary supplement', price: 90.00, stock: 20, image: 'femister.jpg' },
        { id: 7, name: 'Well woman', category: 'Supplements', price: 150.00, stock: 2, image: 'wellwoman.jpg' },
        { id: 8, name: 'Valuepak', category: 'Supplements', price: 35.00, stock: 4, image: 'valuepack.jpg' },
        { id: 9, name: 'Perfectil', category: 'Supplement', price: 110.00, stock: 2, image: 'perfectil.jpg' },
        { id: 10, name: 'Amoksiclav', category: 'Antibiotic', price: 50.00, stock: 10, image: 'amoksiclav.jpg' }
    ];

    // DOM Elements
    const drugsContainer = document.getElementById('drugsContainer');
    const orderSummary = document.getElementById('orderSummary');
    const summaryItems = document.getElementById('summaryItems');
    const orderTotal = document.getElementById('orderTotal');
    const continueShopping = document.getElementById('continueShopping');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModal = document.querySelector('.close-modal');
    const checkoutForm = document.getElementById('checkoutForm');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Render drugs
    function renderDrugs(drugsToRender) {
        drugsContainer.innerHTML = '';
        
        drugsToRender.forEach(drug => {
            const drugCard = document.createElement('div');
            drugCard.className = 'drug-card';
            
            let stockStatus = 'in-stock';
            let stockText = `In Stock (${drug.stock})`;
            
            if (drug.stock < 10) {
                stockStatus = 'low-stock';
                stockText = `Low Stock (${drug.stock})`;
            } else if (drug.stock === 0) {
                stockStatus = 'out-stock';
                stockText = 'Out of Stock';
            }
            
            drugCard.innerHTML = `
                <div class="drug-image">
                    <img src="${drug.image}" alt="${drug.name}">
                </div>
                <div class="drug-info">
                    <h3>${drug.name}</h3>
                    <span class="drug-category">${drug.category}</span>
                    <div class="drug-price">GHC ${drug.price.toFixed(2)}</div>
                    <div class="drug-stock ${stockStatus}">${stockText}</div>
                    <div class="drug-quantity">
                        <label for="quantity-${drug.id}">Quantity:</label>
                        <input type="number" id="quantity-${drug.id}" min="1" max="${drug.stock}" value="1" ${drug.stock === 0 ? 'disabled' : ''}>
                    </div>
                    <button class="btn add-to-cart" data-id="${drug.id}" ${drug.stock === 0 ? 'disabled' : ''}>
                        ${drug.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            `;
            
            drugsContainer.appendChild(drugCard);
        });
        
        // Add event listeners to all add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const drugId = parseInt(this.getAttribute('data-id'));
                const drug = drugs.find(d => d.id === drugId);
                const quantityInput = document.getElementById(`quantity-${drugId}`);
                const quantity = parseInt(quantityInput.value) || 1;
                
                addToCart(drug, quantity);
            });
        });
    }
    
    // Add item to cart
    function addToCart(drug, quantity) {
        const existingItem = cart.find(item => item.id === drug.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: drug.id,
                name: drug.name,
                price: drug.price,
                quantity: quantity,
                category: drug.category
            });
        }
        
        updateCart();
        showOrderSummary();
    }
    
    // Update cart in localStorage and UI
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        // Update cart count display if exists
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }
    
    // Show order summary
    function showOrderSummary() {
        if (cart.length === 0) {
            orderSummary.style.display = 'none';
            return;
        }
        
        summaryItems.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'summary-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>GHC ${itemTotal.toFixed(2)}</span>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            summaryItems.appendChild(itemElement);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
        
        orderTotal.textContent = `GHC ${total.toFixed(2)}`;
        orderSummary.style.display = 'block';
    }
    
    // Remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
        showOrderSummary();
    }
    
    // Event listeners
    if (continueShopping) {
        continueShopping.addEventListener('click', function() {
            orderSummary.style.display = 'none';
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            checkoutModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            checkoutModal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('checkout-name').value;
            const phone = document.getElementById('checkout-phone').value;
            const email = document.getElementById('checkout-email').value;
            const address = document.getElementById('checkout-address').value;
            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            
            // Format order summary
            let orderDetails = `*NEW MEDICATION ORDER*\n\n`;
            orderDetails += `*Customer:* ${name}\n`;
            orderDetails += `*Phone:* ${phone}\n`;
            if (email) orderDetails += `*Email:* ${email}\n`;
            if (address) orderDetails += `*Delivery Address:* ${address}\n`;
            orderDetails += `*Payment Method:* ${paymentMethod}\n\n`;
            orderDetails += `*ORDER ITEMS:*\n`;
            
            cart.forEach(item => {
                orderDetails += `- ${item.name} (x${item.quantity}) - GHC ${(item.price * item.quantity).toFixed(2)}\n`;
            });
            
            orderDetails += `\n*TOTAL: GHC ${orderTotal.textContent.replace('GHC ', '')}*`;
            
            // Encode for WhatsApp
            const encodedMessage = encodeURIComponent(orderDetails);
            
            // Redirect to WhatsApp
            window.location.href = `https://wa.me/233598160732?text=${encodedMessage}`;
            
            // Clear cart
            cart = [];
            updateCart();
            orderSummary.style.display = 'none';
            checkoutModal.style.display = 'none';
            checkoutForm.reset();
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Initial render
    renderDrugs(drugs);
    showOrderSummary();
});