// Cargar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(codigo, producto, precio, stock) {
    const existingProduct = cart.find(item => item.producto === producto);

    if (existingProduct) {
        // Si el producto ya existe, incrementar la cantidad
        const newQuantity = existingProduct.unit + 1; // Incrementar en 1

        // Verificar si la nueva cantidad no excede el stock disponible
        if (newQuantity > stock) {
            alert(`No puedes agregar más de ${stock} unidades de ${producto}.`);
            return;
        }

        existingProduct.unit = newQuantity; // Actualiza la cantidad
    } else {
        // Si el producto no existe, agregarlo al carrito con unit inicializado a 1
        cart.push({ codigo, unit: 1, producto, precio });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(codigo) {
    const existingProduct = cart.find(item => item.codigo === codigo);

    if (existingProduct) {
        // Disminuir la cantidad en 1
        existingProduct.unit -= 1;

        // Si la cantidad llega a 0, eliminar el producto del carrito
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