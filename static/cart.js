// Cart page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const emptyCart = document.getElementById('emptyCart');
    const cartWithItems = document.getElementById('cartWithItems');
    const cartItemsContainer = document.getElementById('cartItems');
    const helpSection = document.getElementById('helpSection');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartWithItems.style.display = 'none';
        helpSection.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartWithItems.style.display = 'flex';
        helpSection.style.display = 'block';
        
        // Update counts
        document.getElementById('itemCount').textContent = cart.length;
        document.getElementById('summaryCount').textContent = cart.length;
        
        // Render cart items
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const itemHTML = `
                <div class="card shadow-sm mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="flex-grow-1">
                                <span class="service-badge fw-semibold small mb-2">${item.category}</span>
                                <h3 class="h5 fw-bold card-title mb-1 mt-4">${item.name}</h3>
                                <div class="h6 services-prices mb-0">${item.price}</div>
                            </div>
                            <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${index})">
                                <img id="trash" src="/static/img/trash-fill.svg" alt="Delete">
                            </button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
        });
    }
}

function getCategoryColor(category) {
    const colors = {
        'Lending': 'primary',
        'Investment': 'success',
        'Insurance': 'info',
        'Advisory': 'warning'
    };
    return colors[category] || 'secondary';
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    if (confirm('Are you sure you want to clear all items from your cart?')) {
        localStorage.removeItem('cart');
        loadCart();
    }
}