const cart = document.getElementById('cart');
const button = document.getElementById('cart-opener')
const close = document.getElementById('close')
const body = document.getElementById('body')
function cartToggle() {
    cart.classList.toggle('hidden')
    // body.classList.toggle('overflow-y-hidden')
}

function cartClose(e) {
    cart.classList.add('hidden')
    // body.classList.remove('overflow-y-hidden')
}

button.addEventListener('click', cartToggle)
close.addEventListener('click', cartClose)