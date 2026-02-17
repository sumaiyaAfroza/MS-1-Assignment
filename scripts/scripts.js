const categoryContainer = document.getElementById("category-btns");
const productContainer = document.getElementById("product-container");

let cartCount = 0;

// ================= FETCH CATEGORIES =================
async function loadCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data = await res.json();

  // add ALL first
  const allBtn = createCategoryBtn("All");
  categoryContainer.appendChild(allBtn);

  data.forEach(cat => {
    const btn = createCategoryBtn(cat);
    categoryContainer.appendChild(btn);
  });
}

// create button
function createCategoryBtn(category) {
  const btn = document.createElement("button");

  btn.innerText = category;
  btn.className =
    "px-4 py-2 rounded-full border text-sm font-medium hover:bg-indigo-600 hover:text-white";

  btn.addEventListener("click", () => {
    setActive(btn);

    if (category === "All") {
      loadProducts();
    } else {
      loadCategoryProducts(category);
    }
  });

  return btn;
}

// active style
function setActive(activeBtn) {
  document.querySelectorAll("#category-btns button").forEach(btn => {
    btn.classList.remove("bg-indigo-600", "text-white");
  });

  activeBtn.classList.add("bg-indigo-600", "text-white");
}

// ================= FETCH ALL PRODUCTS =================
async function loadProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  showProducts(data);
}

// ================= CATEGORY PRODUCTS =================
async function loadCategoryProducts(category) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const data = await res.json();
  showProducts(data);
}

// ================= SHOW PRODUCTS =================
function showProducts(products) {
  productContainer.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");

    card.className =
      "bg-white rounded-xl shadow-sm border p-4 flex flex-col";

    card.innerHTML = `
      <img src="${p.image}" 
      class="h-52 object-contain mb-4 bg-gray-100 rounded"/>

      <div class="flex justify-between items-center mb-2">
        <span class="text-[11px] bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
          ${p.category}
        </span>

        <div class="text-sm text-gray-600 flex items-center gap-1">
          ⭐ ${p.rating.rate}
          <span class="text-gray-400">(${p.rating.count})</span>
        </div>
      </div>

      <h3 class="font-semibold text-sm mb-1 line-clamp-2">
        ${p.title}
      </h3>

      <p class="font-bold mb-3">$${p.price}</p>

      <div class="flex gap-2 mt-auto">
        <button class="border px-3 py-2 rounded w-full text-sm">
          <i class="fa-regular fa-eye"></i> Details
        </button>

        <button class="add-btn bg-indigo-600 text-white px-3 py-2 rounded w-full text-sm">
          <i class="fa-solid fa-cart-shopping"></i> Add
        </button>
      </div>
    `;

    // add to cart
    card.querySelector(".add-btn").addEventListener("click", () => {
      cartCount++;
      document.getElementById("cart-count").innerText = cartCount;
    });

    productContainer.appendChild(card);
  });
}

// ================= INIT =================
loadCategories();
loadProducts();
