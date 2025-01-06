let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(productId, name, price, image) {
    const existingItem = cartItems.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            productId,
            name,
            price,
            image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
    updateCartCount();
    alert('Product added to cart!');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.productId !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
    updateCartCount();
}

function updateQuantity(productId, newQuantity) {
    const item = cartItems.find(item => item.productId === productId);
    if (item) {
        item.quantity = parseInt(newQuantity) || 1;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    const tbody = document.querySelector('#cart-items');
    if (!tbody) return;

    tbody.innerHTML = '';
    let subtotal = 0;

    cartItems.forEach(item => {
        const total = item.price * item.quantity;
        subtotal += total;

        tbody.innerHTML += `
            <tr>
                <td><a href="#" onclick="removeFromCart('${item.productId}'); return false;"><i class="fa-solid fa-x"></i></a></td>
                <td><img src="${item.image}" alt="" style="width: 50px;"></td>
                <td>${item.name}</td>
                <td>₹ ${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.productId}', this.value)"></td>
                <td>₹ ${total}</td>
            </tr>
        `;
    });

    // Update cart subtotal, shipping, and total
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartShipping = document.getElementById('cart-shipping');
    const cartTotal = document.getElementById('cart-total');

    if (cartSubtotal && cartShipping && cartTotal) {
        cartSubtotal.innerText = `₹ ${subtotal}`;
        const shipping = subtotal > 0 ? 100 : 0;
        cartShipping.innerText = `₹ ${shipping}`;
        cartTotal.innerText = `₹ ${subtotal + shipping}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartDisplay();
}); 