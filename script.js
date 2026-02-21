let cart = [];

const loadCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => displayCategories(data));
};

const displayCategories = (categories) => {
    const container = document.getElementById('category-container');

    // 🟡 Function to handle active state
    const setActive = (clickedBtn) => {
        const buttons = container.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('btn-primary')); // remove from all
        buttons.forEach(btn => btn.classList.add('btn-outline'));    // add outline to all
        clickedBtn.classList.remove('btn-outline');                  // remove outline from clicked
        clickedBtn.classList.add('btn-primary');                     // add primary to clicked
    }

    //  Add "All" button first
    const allBtn = document.createElement('button');
    allBtn.innerText = "All";
    allBtn.className = "btn btn-outline btn-sm";
    allBtn.onclick = () => loadProducts(); // Load all products
    setActive(allBtn); // Set active color

    container.appendChild(allBtn);

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.innerText = cat;
        btn.className = "btn btn-outline";
        btn.onclick = () => loadCategoryProducts(cat); // Load specific category

        container.appendChild(btn);
    });
};

const loadProducts = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => displayProducts(data));
};

const loadCategoryProducts = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => displayProducts(data));
};

const displayProducts = (products) => {
    const container = document.getElementById('product-container');
    container.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement('div');
        div.className = "card bg-base-200 shadow-md";

        div.innerHTML = `
        <figure>
            <img src="${p.image}" class="h-40 w-full object-contain p-2"/>
        </figure>

        <div class="card-body p-2">

            <h3 class="text-sm font-bold">
                ${p.title.slice(0, 30)}...
            </h3>

            <!-- Category + Rating -->
            <div class="flex justify-between items-center text-xs text-gray-500 ">

                <p>${p.category}</p>

                <p class="flex items-center  gap-1 text-sm ">
                    <i class="fa-solid fa-star text-yellow-400"></i>
                    ${p.rating.rate}
                    <span class="text-gray-400">
                        (${p.rating.count})
                    </span>
                </p>

            </div>

            <p class="text-primary font-semibold">
                $${p.price}
            </p>

            <div class="flex flex-col sm:flex-row gap-2">
                <button class="btn btn-info btn-sm"
                onclick="showDetails(${p.id})">
                Details
                </button>

                <button class="btn btn-success btn-sm"
                onclick="addToCart(${p.id})">
                Add to Cart
                </button>
            </div>

        </div>
        `;

        container.appendChild(div);
    });
};


const showDetails = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(p => {
            document.getElementById('modal-content').innerHTML = `
   <img src="${p.image}" class="h-40 mx-auto"/>
   <h2>${p.title}</h2>
   <p>${p.description}</p>
   <p>$${p.price}</p>
   `;
            productModal.showModal();
        });
};

const addToCart = (id) => {
    cart.push(id);
    document.getElementById('cart-count').innerText = cart.length;
};

loadCategories();
loadProducts();
