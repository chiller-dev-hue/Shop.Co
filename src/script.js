// console.log("Javascript is Connected Successfully");
// console.log("This is a test message to check if the script is working properly.");
// console.log("Hello World!");

// MOBILE MENU
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

const menuOpenIcon = document.getElementById("menu-open-icon");
const menuCloseIcon = document.getElementById("menu-close-icon");

if (mobileMenuButton) {

    mobileMenuButton.addEventListener("click", function () {

        mobileMenu.classList.toggle("hidden");

        menuOpenIcon.classList.toggle("hidden");
        menuCloseIcon.classList.toggle("hidden");

        const isMenuOpen = !mobileMenu.classList.contains("hidden");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isMenuOpen
        );
    });
}


// MOBILE SEARCH
const mobileSearchButton = document.getElementById("mobile-search-button");
const mobileSearch = document.getElementById("mobile-search");
const mobileSearchInput = document.getElementById("mobile-search-input");

const mobileSearchOpenIcon = document.getElementById(
    "mobile-search-open-icon"
);

const mobileSearchCloseIcon = document.getElementById(
    "mobile-search-close-icon"
);

if (mobileSearchButton) {

    mobileSearchButton.addEventListener("click", function () {

        mobileSearch.classList.toggle("hidden");

        mobileSearchOpenIcon.classList.toggle("hidden");
        mobileSearchCloseIcon.classList.toggle("hidden");

        const isSearchOpen =
            !mobileSearch.classList.contains("hidden");

        mobileSearchButton.setAttribute(
            "aria-expanded",
            isSearchOpen
        );

        if (isSearchOpen) {
            mobileSearchInput.focus();
        }
    });
}

// PRODUCTS
const products = [

    {
        id: 1,
        name: "T-shirt with Tape Details",
        price: 120,
        image: "/src/assets/image 7-Photoroom.png"
    },
    {
        id: 2,
        name: "Skinny Fit Jeans",
        price: 240,
        image: "/src/assets/image 8-Photoroom.png"
    },
    {
        id: 3,
        name: "Checkered Shirt",
        price: 180,
        image: "/src/assets/image 9-Photoroom.png"
    },
    {
        id: 4,
        name: "Sleeve Striped T-Shirt",
        price: 130,
        image: "/src/assets/image 10-Photoroom.png"
    },
    {
        id: 5,
        name: "Vertical Striped Shirt",
        price: 212,
        image: "/src/assets/image 7 (1)-Photoroom.png"
    },
    {
        id: 6,
        name: "Courage Graphic T-Shirt",
        price: 145,
        image: "/src/assets/image 8 (1)-Photoroom.png"
    },
    {
        id: 7,
        name: "Loose Fit Bermuda Shorts",
        price: 80,
        image: "/src/assets/image 9 (1)-Photoroom.png"
    },
    {
        id: 8,
        name: "Faded Skinny Jeans",
        price: 210,
        image: "/src/assets/image 10 (1)-Photoroom.png"
    }
];


// GET CART FROM LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Permanently Clear the Saved Cart
// localStorage.removeItem("cart");
// cart = [];

// ADD TO CART
const addToCartButtons =
    document.querySelectorAll(".add-to-cart");

console.log("Add to Cart buttons found:", addToCartButtons.length);

addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Get product ID
        const productId =
            Number(button.getAttribute("data-product-id"));

        console.log("Clicked product ID:", productId);

        // Find product
        const product = products.find(function (item) {
            return item.id === productId;
        });

        // Stop if product doesn't exist
        if (!product) {console.error("Product not found:",productId);
            return;
        }

        // Check if product already exists
        const existingProduct = cart.find(function (item) {
            return item.id === productId;
        });

        // If product already exists
        if (existingProduct) {
            existingProduct.quantity += 1;
        }

        // If product doesn't exist
        else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        // Save cart
        localStorage.setItem("cart",JSON.stringify(cart));
        updateCartCount();

        // Button feedback
        const originalText = button.textContent;
        button.textContent = "Added ✓";
        button.disabled = true;
        setTimeout(function () {
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);

        console.log("Current cart:", cart);
    });
});  

// CART COUNT
const cartCount = document.getElementById("cart-count");
function updateCartCount() {
    const totalItems = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);
    if (cartCount) {
    cartCount.textContent = totalItems;
    }
}
updateCartCount();


// DISPLAY CART ITEMS
const cartItemsContainer =
    document.getElementById("cart-items");


// CART SUMMARY ELEMENTS
const cartSubtotal =
    document.getElementById("cart-subtotal");

const cartDiscount =
    document.getElementById("cart-discount");

const deliveryFeeElement =
    document.getElementById("delivery-fee");

const cartTotal =
    document.getElementById("cart-total");


// DISPLAY CART ITEMS
function displayCartItems() {

    // Check if we are on the cart page
    if (!cartItemsContainer) {
        return;
    }

    // Clear the cart container
    cartItemsContainer.innerHTML = "";

    // Check if cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="py-10 text-center">
                <p class="text-gray-500">
                    Your Cart is empty.
                </p>
                <a
                    href="./index.html"
                    class="mt-4 inline-flex min-w-48 items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-medium text-white">
                    Continue Shopping
                </a>
            </div>
        `;

        // Update summary even when cart is empty
        updateCartSummary();
        return;
    }

    // Display every product in the cart
    cart.forEach(function (item) {
        const cartItem =
            document.createElement("div");
        cartItem.className =
            "flex flex-col gap-5 border-b border-gray-200 py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between";

        cartItem.innerHTML = `

            <!-- Product -->
            <div class="flex items-center gap-4">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="h-24 w-24 rounded-xl bg-gray-100 object-cover">
                <div>
                    <h2 class="font-semibold">
                        ${item.name}
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">
                        $${item.price}
                    </p>
                </div>
            </div>

            <!-- Quantity -->
            <div class="flex items-center gap-3">
                <button
                    type="button"
                    class="decrease-quantity rounded-full border border-gray-200 px-4 py-2 text-lg"
                    data-product-id="${item.id}">
                    -
                </button>

                <span class="min-w-6 text-center font-medium">
                    ${item.quantity}
                </span>

                <button
                    type="button"
                    class="increase-quantity rounded-full border border-gray-200 px-4 py-2 text-lg"
                    data-product-id="${item.id}">
                    +
                </button>
            </div>

            <!-- Product Total -->
            <p class="font-semibold">
                $${item.price * item.quantity}
            </p>

            <!-- Remove -->
            <button
                type="button"
                class="remove-from-cart text-sm text-red-500 hover:underline"
                data-product-id="${item.id}">
                Remove
            </button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Activate buttons
    addQuantityEvents();

    // Update summary
    updateCartSummary();
}

// CART SUMMARY
function updateCartSummary() {

    // If the summary doesn't exist,
    // we are probably not on cart.html
    if (!cartSubtotal) {
        return;
    }

    // Calculate subtotal
    const subtotal = cart.reduce(
        function (total, item) {
            return total +
                (item.price * item.quantity);
        },
        0
    );

    // Discount
    // Currently 0 because i have not
    // added a discount system yet.
    const discount = 0;

    // Delivery fee
    const deliveryFee =
        cart.length > 0 ? 15 : 0;

    // Calculate final total
    const total =
        subtotal - discount + deliveryFee;

    // Display values
    cartSubtotal.textContent =
        `$${subtotal}`;

    cartDiscount.textContent =
        `-$${discount}`;

    deliveryFeeElement.textContent =
        `$${deliveryFee}`;

    cartTotal.textContent =
        `$${total}`;
}

// QUANTITY + / - AND REMOVE BUTTONS
function addQuantityEvents() {
    const increaseButtons =
        document.querySelectorAll(".increase-quantity");

    const decreaseButtons =
        document.querySelectorAll(".decrease-quantity");

    const removeButtons =
        document.querySelectorAll(".remove-from-cart");

    // INCREASE QUANTITY
    increaseButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId =
                Number(
                    button.getAttribute("data-product-id")
                );

            const product =
                cart.find(function (item) {
                    return item.id === productId;
                });

            if (product) {
                product.quantity += 1;
            }

            // Save cart
            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            // Update badge
            updateCartCount();

            // Display cart again
            displayCartItems();
        });
    });

    // DECREASE QUANTITY
    decreaseButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId =
                Number(
                    button.getAttribute("data-product-id")
                );

            const product =
                cart.find(function (item) {
                    return item.id === productId;
                });


            if (product) {
                product.quantity -= 1;

                // Remove product if quantity reaches 0
                if (product.quantity <= 0) {
                    cart = cart.filter(
                        function (item) {
                            return item.id !== productId;
                        }
                    );
                }
            }

            // Save cart
            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            // Update badge
            updateCartCount();

            // Display cart again
            displayCartItems();
        });
    });

    // REMOVE PRODUCT
    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId =
                Number(
                    button.getAttribute("data-product-id")
                );

            cart = cart.filter(
                function (item) {
                    return item.id !== productId;
                }
            );

            // Save cart
            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            // Update badge
            updateCartCount();

            // Display cart again
            displayCartItems();
        });
    });
}


// CHECKOUT BUTTON
const checkoutButton =
    document.getElementById("checkout-button");

if (checkoutButton) {
    checkoutButton.addEventListener("click",
        function () {

            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            alert(
                "Checkout will be available soon."
            );
        }
    );
}


// DISPLAY CART WHEN PAGE LOADS
displayCartItems();



