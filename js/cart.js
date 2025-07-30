let cartItems = []

function renderCart() {
    const itemCount = document.getElementById('item-count')
    const cart = document.getElementById('cart')
    let count = 0
    let html = ''
    if(!cartItems || cartItems.length === 0) {
        html = `
        <div class="flex flex-col items-center mt-6 mb-6">
          <img src="assets/images/illustration-empty-cart.svg" alt="empty-cart">
          <p class="empty-msg">Your added items will appear here</p>
        </div>
        `
    }
    else {
        const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
        count = cartItems.reduce((sum, item) => sum + item.quantity, 0)
        cartItems.forEach(item => {
            html += `
            <div class="mb-5 relative">
                <p class="font-semibold mb-2">${item.name}</p>
                <div class="flex space-x-2 text-sm">
                    <p class="font-bold quantity">${item.quantity}x</p>
                    <p>@ $${item.price.toFixed(2)}</p>
                    <p class=" font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                 <button id="rm-${item.id}" class="absolute ml-auto right-0 bottom-5 cursor-pointer">
                    <img src="assets/images/icon-remove-item.svg" alt="remove button" class="w-4 h-4 opacity-60 hover:opacity-100">
                </button>
            </div>
            <hr class="mb-5">
            `
        })
        html += `
        <div class="flex justify-between mb-5">
            <p>Order Total</p>
            <strong id="cart-total" class="text-2xl font-bold">$${total.toFixed(2)}</strong>
        </div>

        <div class="flex gap-2 bg-[hsl(13,31%,94%)] p-3 rounded-md mb-5">
            <img src="assets/images/icon-carbon-neutral.svg" alt="carbon-neutral">
            <span>This is a <strong class="font-semibold">carbon-neutral</strong> delivery</span>
        </div>

        <button id="confirm" class="w-full py-3 text-[hsl(20,50%,98%)] bg-[hsl(14,86%,42%)] font-semibold rounded-full cursor-pointer">
            Confirm Order
        </button>
        `
    }
    
    itemCount.innerHTML = count
    cart.innerHTML = html

    cartItems.forEach(item => {
        const btn = document.getElementById(`rm-${item.id}`)
        if (btn) {
            btn.addEventListener('click', () => removeFromCart(item.id))
        }
    document.getElementById("confirm").addEventListener('click', confirmOrder)
    })
}

export function addToCart({id, name, price}) {
    const existingItem = cartItems.find(item => item.name === name)
    if(existingItem) {
        existingItem.quantity++
    }
    else {
        cartItems.push({id, name, price, quantity: 1})
    }
    renderCart()
}

function removeFromCart(id) {
    console.log("removed product from cart:")
    cartItems = cartItems.filter(item => item.id != id)
    renderCart()
}

function confirmOrder() {
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
    const checkout = document.getElementById("checkout")
    let html = ''
    cartItems.forEach(item => {
        html = ` 
            <p class="font-semibold mb-2">${item.name}</p>
            <div class="flex space-x-2 text-sm">
                <p class="font-bold text-[hsl(14,86%,42%)]">${item.quantity}x</p>
                <p>@ $${item.price.toFixed(2)}</p>
                <p class="ml-auto font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `
        checkout.insertAdjacentHTML('beforeend', html)
    })
    html = `
        <div class="flex justify-between mt-4 pt-4">
            <p class="font-semibold">Order Total</p>
            <strong id="cart-total" class="text-2xl font-bold">$${total.toFixed(2)}</strong>
        </div>
    `
    checkout.insertAdjacentHTML('beforeend', html)
    document.getElementById("modal").classList.remove("hidden")
    document.getElementById("new-order").addEventListener('click', newOrder)
}

function newOrder() {
    document.getElementById("modal").classList.add("hidden")
    cartItems = []
    renderCart()
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart()
})
