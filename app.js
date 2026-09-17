const products = [
  { name: "Vaso Nube", category: "Hogar", price: "$ 24", material: "PLA reciclado", image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=85", description: "Una silueta suave para darle volumen y calma a cualquier estante." },
  { name: "Lámpara Arco", category: "Hogar", price: "$ 58", material: "PLA mate", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85", description: "Luz cálida y una curva limpia que cambia el ambiente sin ocuparlo." },
  { name: "Organizador Loop", category: "Escritorio", price: "$ 18", material: "PETG resistente", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85", description: "Todo en su lugar. Diseñado para cables, lápices y las pequeñas cosas del día." },
  { name: "Sujetalibros Uno", category: "Hogar", price: "$ 29", material: "PLA reciclado", image: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&w=900&q=85", description: "Una pieza geométrica que sostiene tus libros y le da ritmo a tu biblioteca." },
  { name: "Maceta Orbital", category: "Hogar", price: "$ 32", material: "PLA bio", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85", description: "Un pequeño planeta para que tus plantas tengan un hogar a su altura." },
  { name: "Dock Minimal", category: "Escritorio", price: "$ 22", material: "PLA mate", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=85", description: "La base justa para tu teléfono, tus llaves y el comienzo de cada mañana." },
  { name: "Clip Terra", category: "Accesorios", price: "$ 12", material: "TPU flexible", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85", description: "Un clip ligero, útil y con el color suficiente para encontrarlo siempre." },
  { name: "Anillo Forma", category: "Accesorios", price: "$ 16", material: "PLA sedoso", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85", description: "Una forma inesperada para llevar un poco de diseño contigo." },
  { name: "Bandeja Senda", category: "Hogar", price: "$ 26", material: "PLA reciclado", image: "https://images.unsplash.com/photo-1600428853876-fb5a850b444f?auto=format&fit=crop&w=900&q=85", description: "Una superficie para reunir lo esencial y dejar respirar el resto." },
  { name: "Soporte Fold", category: "Escritorio", price: "$ 19", material: "PETG resistente", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=85", description: "Tu pantalla en el ángulo correcto, sin complicaciones." },
  { name: "Llavero Punto", category: "Accesorios", price: "$ 9", material: "TPU flexible", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85", description: "Un detalle pequeño para hacer más tuyo lo que llevas todos los días." },
  { name: "Portalápices Alto", category: "Escritorio", price: "$ 21", material: "PLA mate", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=900&q=85", description: "Una columna de color para que las ideas no se dispersen." }
];

const grid = document.querySelector("#product-grid");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const modal = document.querySelector("#product-modal");

function renderProducts() {
  const activeCategory = document.querySelector(".category-tab.is-active").dataset.category;
  const query = searchInput.value.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = visibleProducts.map((product, index) => `
    <article class="product-card" data-product="${products.indexOf(product)}" style="animation-delay: ${index * 45}ms">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-index">${String(products.indexOf(product) + 1).padStart(2, "0")}</span>
        <span class="product-arrow" aria-hidden="true">↗</span>
      </div>
      <div class="product-details">
        <div><h3 class="product-name">${product.name}</h3><p class="product-category">${product.category}</p></div>
        <p class="product-price">${product.price}</p>
      </div>
    </article>
  `).join("");
  emptyState.hidden = visibleProducts.length > 0;
  grid.hidden = visibleProducts.length === 0;
}

function openProduct(product) {
  document.querySelector("#modal-image").src = product.image;
  document.querySelector("#modal-image").alt = product.name;
  document.querySelector("#modal-category").textContent = product.category;
  document.querySelector("#modal-title").textContent = product.name;
  document.querySelector("#modal-description").textContent = product.description;
  document.querySelector("#modal-material").textContent = product.material;
  document.querySelector("#modal-price").textContent = product.price;
  modal.showModal();
}

document.querySelectorAll(".category-tab").forEach((tab) => tab.addEventListener("click", () => {
  document.querySelectorAll(".category-tab").forEach((item) => {
    item.classList.remove("is-active");
    item.setAttribute("aria-selected", "false");
  });
  tab.classList.add("is-active");
  tab.setAttribute("aria-selected", "true");
  renderProducts();
}));

searchInput.addEventListener("input", renderProducts);
grid.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  if (card) openProduct(products[Number(card.dataset.product)]);
});
document.querySelector("#modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
renderProducts();