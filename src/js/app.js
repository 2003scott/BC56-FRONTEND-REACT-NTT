import { FECHT } from "../lib/fecht.js"

const productosContainer = document.getElementById("productos")
const loader = document.querySelector(".loader")
const cartCounter = document.getElementById("count-counter")
const searchInput = document.getElementById("search")
const categorySelect = document.getElementById("category-select")

let cartCount = 0
let allProducts = []
let categories = []

async function initApp() {
    try {
        showLoader()
        const [productsData, categoriesData] = await Promise.all([
            FECHT("/products"),
            FECHT("/products/categories")
        ])
        allProducts = productsData?.products || []
        categories = categoriesData || []
        populateCategorySelect()
        renderProducts(allProducts)
        setupEventListeners()
    } catch (error) {
        console.error("Error: ", error)
        showError("Algo Salió Mal :c")
    } finally {
        hideLoader()
    }
}

function showLoader() {
    loader.classList.remove("hidden")
    productosContainer.classList.add("hidden")
}

function hideLoader() {
    loader.classList.add("hidden")
    productosContainer.classList.remove("hidden")
}

function showError(message) {
    const errorMessage = document.createElement("p")
    errorMessage.textContent = message
    productosContainer.appendChild(errorMessage)
    productosContainer.classList.toggle("error")
}

function populateCategorySelect() {
    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.name
        option.textContent = category.name
        categorySelect.appendChild(option)
    })
}

function setupEventListeners() {
    searchInput.addEventListener("input", filterProducts)
    categorySelect.addEventListener("change", filterProducts)
}

function renderProducts(products) {
    while (productosContainer.firstChild) {
        productosContainer.removeChild(productosContainer.firstChild)
    }

    const fragment = document.createDocumentFragment()

    products.forEach((item, index) => {
        const cardProduct = createProductCard(item, index)
        fragment.appendChild(cardProduct)
    })

    productosContainer.appendChild(fragment)
}

function createProductCard(item, index) {
    const cardProduct = document.createElement("div")
    cardProduct.classList.add("card-product")
    cardProduct.setAttribute("data-name", item.title)
    cardProduct.setAttribute("key", index)

    const imageContainer = document.createElement("div")
    imageContainer.classList.add("card-image-container")
    const image = document.createElement("img")
    image.classList.add("card-product-image")
    image.src = item.images[0]
    image.alt = item.title
    imageContainer.appendChild(image)

    const article = document.createElement("article")
    article.classList.add("card-container-article")

    const cardArticle = document.createElement("div")
    cardArticle.classList.add("card-article")

    const title = document.createElement("h2")
    title.classList.add("card-product-title")
    title.textContent = item.title

    const category = document.createElement("span")
    category.classList.add("card-product-badged")
    category.textContent = item.category

    cardArticle.appendChild(title)
    cardArticle.appendChild(category)

    const priceContainer = document.createElement("div")
    const price = document.createElement("p")
    price.textContent = `S/ ${item.price}`
    priceContainer.appendChild(price)

    const description = document.createElement("p")
    description.classList.add("card-product-description")
    description.textContent = item.description

    article.appendChild(cardArticle)
    article.appendChild(priceContainer)
    article.appendChild(description)

    const button = document.createElement("button")
    button.type = "button"
    button.classList.add("card-button")
    button.textContent = "Agregar al Carrito"
    button.addEventListener("click", () => {
        cartCount++
        updateCartCount()
    })

    cardProduct.appendChild(imageContainer)
    cardProduct.appendChild(article)
    cardProduct.appendChild(button)

    return cardProduct
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value.toLowerCase();

    const filteredProducts = allProducts.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || product.category.toLowerCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filteredProducts);
}

function updateCartCount() {
    cartCounter.textContent = cartCount
}

initApp()
