// Services page JavaScript

// Category filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const serviceItems = document.querySelectorAll('.service-item');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter services
            serviceItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            const servicePrice = this.getAttribute('data-price');
            const category = this.closest('.service-item').getAttribute('data-category');
            
            // Get existing cart or create new one
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Add service to cart
            cart.push({
                name: serviceName,
                price: servicePrice,
                category: category,
                id: Date.now()
            });
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount();
            
            // Show feedback
            this.innerHTML = '✓ Added!';
            this.classList.add('btn-success');
            this.classList.remove('btn-primary');
            
            setTimeout(() => {
                this.innerHTML = '+ Add to Cart';
                this.classList.add('btn-primary');
                this.classList.remove('btn-success');
            }, 2000);
        });
    });
    
    // Update cart count on page load
    updateCartCount();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = cart.length;
    });
}

const catButtons = document.querySelectorAll('.category-btn');

catButtons.forEach(button => {
    button.addEventListener('click', () => {
        // remove active from all buttons
        catButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // set active on clicked button
        button.classList.add('active');

        // filter services
        const category = button.getAttribute('data-category');
        const services = document.querySelectorAll('.service-item');

        services.forEach(service => {
            if (category === 'all' || service.getAttribute('data-category') === category) {
                service.style.display = 'block';
            } else {
                service.style.display = 'none';
            }
        });
    });
});