async function loadData() {
    try {
        const response = await fetch('../data.json')
        if(!response.ok) {
            throw new Error('Failed to fetch the data')
        }
        const data = await response.json()
        console.log(data)
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
        data.forEach(product => {
        const html = `
           <div class="product">
              <div class="relative mb-8">
                <img class="w-full h-auto object-cover rounded-2xl" src="${product.image.desktop}" alt="${product.name}">
                <button id="add-btn" class="absolute px-4 py-2 left-1/2 transform -translate-x-1/2 -translate-y-4 border rounded-2xl text-md sm:text-sm">
                  <div class="flex">
                    <img src="assets/images/icon-add-to-cart.svg" alt="cart-icon">
                    <p>Add to Cart</p>
                  </div>
                </button>
              </div>
              <p class="category">${product.category}</p>
              <p class="font-semibold">${product.name}</p>
              <p class="price font-semibold">\$${product.price.toFixed(2)}</p>
        </div>
        `
        productList.insertAdjacentHTML('beforeend', html);
        })
    } 
})

    

