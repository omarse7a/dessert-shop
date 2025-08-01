import { addToCart, decrementItem } from './cart.js'

async function loadData() {
    try {
        const response = await fetch('../data.json')
        if(!response.ok) {
            throw new Error('Failed to fetch the data')
        }
        const data = await response.json()
        data.forEach(product => product.quantity = 0)
        return data
    }
    catch(e) {
        console.error(e)
    }
 
}

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById("product-list")
    const products = await loadData()
    if(products) {
      let id = 0
      products.forEach(product => {
        product.id = id
        const html = `
            <div class="product">
              <div class="relative mb-8">
                <img id="cover-${id}" class="w-full h-auto object-cover rounded-2xl" src="${product.image.desktop}" alt="${product.name}">
                <button 
                    id="add-${id}" 
                    class="absolute w-[50%] px-3 py-3 left-1/2 transform -translate-x-1/2 -translate-y-6 border border-[hsl(12,20%,44%)] 
                    bg-[hsl(20,50%,98%)] rounded-full cursor-pointer hover:text-[hsl(14,86%,42%)] hover:border-[hsl(14,86%,42%)] transition"
                  >
                  <div class="flex gap-2 justify-center">
                    <img src="assets/images/icon-add-to-cart.svg" alt="cart-icon">
                    <p class="font-semibold text-sm">Add to Cart</p>
                  </div>
                </button>
                <div 
                  id="selector-${id}" 
                  class="absolute w-[50%] px-3 py-3 left-1/2 transform -translate-x-1/2 -translate-y-6 
                  text-[hsl(20,50%,98%)] bg-[hsl(14,86%,42%)] rounded-full hidden"
                  >
                  <div class="flex gap-2 justify-between">
                    <button id="inc-${id}" class="cursor-pointer">
                      <img src="assets/images/icon-increment-quantity.svg" alt="inc-icon">
                    </button>
                    <p id="qty-${id}" class="font-semibold text-sm">${product.quantity}</p>
                    <button id="dec-${id}" class="cursor-pointer">
                      <img src="assets/images/icon-decrement-quantity.svg" alt="dec-icon">
                    </button>
                  </div>
                </div>
              </div>
              <p class="text-[hsl(12,20%,44%)]">${product.category}</p>
              <p class="font-semibold">${product.name}</p>
              <p class="price font-semibold text-[hsl(14,86%,42%)]">\$${product.price.toFixed(2)}</p>
        </div>
        `
        productList.insertAdjacentHTML('beforeend', html);

        const quantity = document.getElementById(`qty-${product.id}`)
        const addButton = document.getElementById(`add-${id}`)
        const cover = document.getElementById(`cover-${id}`)
        const selector = document.getElementById(`selector-${product.id}`)

        addButton.addEventListener('click', () => {
          product = addToCart({id: product.id, name: product.name, 
                                  price: product.price, 
                                  quantity: product.quantity})
          addButton.classList.add("hidden")
          quantity.innerHTML = product.quantity
          selector.classList.remove("hidden")
          cover.classList.add("border-2", "border-[hsl(14,86%,42%)]")
        })

        document.getElementById(`inc-${id}`).addEventListener('click', () => {
            product = addToCart(product)
            quantity.innerHTML = product.quantity
        })

        document.getElementById(`dec-${id}`).addEventListener('click', () => {
            product = decrementItem(product.id)
            if(product.quantity > 0)
              quantity.innerHTML = product.quantity
        })
        
        id++
      })
    }
})

export function updateProduct(id) {
      const addButton = document.getElementById(`add-${id}`)
      const cover = document.getElementById(`cover-${id}`)
      const selector = document.getElementById(`selector-${id}`)
      addButton.classList.remove("hidden")
      selector.classList.add("hidden")
      cover.classList.remove("border-2", "border-[hsl(14,86%,42%)]")
}

