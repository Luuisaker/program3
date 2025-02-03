let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(codigo, producto, precio, stock) {
    const existingProduct = cart.find(item => item.producto === producto);

    if (existingProduct) {
        
        const newQuantity = existingProduct.unit + 1; // Incrementar en 1

       
        if (newQuantity > stock) {
            alert(`No puedes agregar más de ${stock} unidades de ${producto}.`);
            return;
        }

        existingProduct.unit = newQuantity; // Actualiza la cantidad
    } else {
        
        cart.push({ codigo, unit: 1, producto, precio });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(codigo) {
    const existingProduct = cart.find(item => item.codigo === codigo);

    if (existingProduct) {
       
        existingProduct.unit -= 1;

        
        if (existingProduct.unit <= 0) {
            cart = cart.filter(item => item.codigo !== codigo);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

function updateCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';

    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="5">El carrito está vacío.</td></tr>';
        document.getElementById('reg-submit').disabled = true;
        return;
    }

    cart.forEach(item => {
        const row = `<tr>
                        <td>${item.producto}</td>
                        <td>${item.unit}</td>
                        <td>${item.precio.toFixed(2)}</td>
                        <td>${(item.unit * item.precio).toFixed(2)}</td>
                        
                     </tr>`;
        cartBody.innerHTML += row;
    });
    document.getElementById('reg-submit').disabled = false;
}

// Llamar a updateCart cuando la ventana se carga
window.onload = function () {
    updateCart();
};
