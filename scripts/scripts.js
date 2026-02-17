// ================= DOM =================
const categoryContainer = document.getElementById("category-btns");
const productContainer = document.getElementById("product-container");
const cartCountEl = document.getElementById("cart-count");

const modal = document.getElementById("product-modal");
const modalContent = document.getElementById("modal-content");
const closeModalBtn = document.getElementById("close-modal");

// ================= CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// ================= LOAD CATEGORIES =================
async function loadCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();

  const allBtn = createCategoryBtn("All");
  categoryContainer.appendChild(allBtn);
  setActive(allBtn);

  categories.forEach(cat => {
    const btn = createCategoryBtn(cat);
    categoryContainer.appendChild(btn);
  });
}

function createCategoryBtn(category) {
  const btn = document.createElement("button");

  btn.innerText = category;
  btn.className =
    "px-4 py-2 rounded-full border text-sm font-medium hover:bg-indigo-600 hover:text-white";

  btn.addEventListener("click", () => {
    setActive(btn);
    if (category === "All") loadProducts();
    else loadCategoryProducts(category);
  });

  return btn;
}

function setActive(activeBtn) {
  document.querySelectorAll("#category-btns button").forEach(btn => {
    btn.classList.remove("bg-indigo-600", "text-white");
  });
  activeBtn.classList.add("bg-indigo-600", "text-white");
}

// ================= PRODUCTS =================
async function loadProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  showProducts(products);
}

async function loadCategoryProducts(category) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const products = await res.json();
  showProducts(products);
}

// ================= SHOW PRODUCTS =================
function showProducts(products) {
  productContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow border p-4 flex flex-col";

    card.innerHTML = `
      <img src="${product.image}"
      class="h-52 object-contain mb-4 bg-gray-100 rounded"/>

      <div class="flex justify-between items-center mb-2">
        <span class="text-[11px] bg-indigo-100 text-indigo-600 px-2 py-1 rounded capitalize">
          ${product.category}
        </span>

        <div class="text-sm text-gray-600">
          ⭐ ${product.rating.rate} (${product.rating.count})
        </div>
      </div>

      <h3 class="font-semibold text-sm mb-1 line-clamp-2">
        ${product.title}
      </h3>

      <p class="font-bold mb-3">$${product.price}</p>

      <div class="flex gap-2 mt-auto">
        <button class="details-btn border px-3 py-2 rounded w-full text-sm">
          Details
        </button>

        <button class="add-btn bg-indigo-600 text-white px-3 py-2 rounded w-full text-sm">
          Add
        </button>
      </div>
    `;

    // add btn
    card.querySelector(".add-btn").addEventListener("click", () => {
      addToCart(product);
    });

    // modal
    card.querySelector(".details-btn").addEventListener("click", () => {
      openModal(product);
    });

    productContainer.appendChild(card);
  });
}

// ================= MODAL =================
function openModal(product) {
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  modalContent.innerHTML = `
    <img src="${product.image}" class="w-full h-72 object-contain bg-gray-100 rounded"/>

    <div>
      <h2 class="text-xl font-bold mb-2">${product.title}</h2>
      <p class="text-gray-600 mb-3">${product.description}</p>
      <p class="font-bold mb-3">$${product.price}</p>

      <button id="modal-add"
        class="bg-indigo-600 text-white px-5 py-2 rounded">
        Add to Cart
      </button>
    </div>
  `;

  // 🔥 modal add button fix
  document.getElementById("modal-add").addEventListener("click", () => {
    addToCart(product);
  });
}

closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

// ================= ADD TO CART =================
function addToCart(product) {
  const exist = cart.find(item => item.id === product.id);

  if (exist) {
    showToast("Already added to cart", "error");
    return;
  }

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  showToast(`${product.title} added to cart`, "success");
}

function updateCartCount() {
  cartCountEl.innerText = cart.length;
}

// ================= TOAST =================
function showToast(message, type) {
  const toast = document.createElement("div");

  let bg = "bg-indigo-600";
  if (type === "error") bg = "bg-red-500";

  toast.className = `
    fixed bottom-10 right-6
    ${bg}
    text-white px-5 py-3 rounded-lg shadow-lg
    animate-slide
    z-50
  `;

  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2200);
}

// ================= INIT =================
loadCategories();
loadProducts();
