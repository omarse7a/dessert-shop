import { addToCart } from './cart.js'

async function loadData() {
    try {
        const response = await fetch('../data.json')
        if(!response.ok) {
            throw new Error('Failed to fetch the data')
        }
        const data = await response.json()
        return data
    }
    catch(e) {
        console.error(`Error loading data: ${e}`)
    }
 
}

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById("product-list")
    const data = await loadData()
    if(data) {
      let id = 0
      data.forEach(product => {
        const currentId = id
        const html = `
            <div class="product">
              <div class="relative mb-8">
                <img class="w-full h-auto object-cover rounded-2xl" src="${product.image.desktop}" alt="${product.name}">
                <button id="add-${id}" class="absolute w-[50%] px-3 py-3 left-1/2 transform -translate-x-1/2 -translate-y-6 border rounded-full">
                  <div class="flex gap-2 justify-center">
                    <img src="assets/images/icon-add-to-cart.svg" alt="cart-icon">
                    <p class="font-semibold text-sm">Add to Cart</p>
                  </div>
                </button>
              </div>
              <p class="category">${product.category}</p>
              <p class="font-semibold">${product.name}</p>
              <p class="price font-semibold">\$${product.price.toFixed(2)}</p>
        </div>
        `
        productList.insertAdjacentHTML('beforeend', html);

        document.getElementById(`add-${id}`).addEventListener('click', () => {
          addToCart({...product, id: currentId})
        })
        id++
      })
    }
})

    

