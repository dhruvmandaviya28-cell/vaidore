/*
   Vaidora Luxury Perfume Store
   Shared E-commerce Engine & State Manager (ES6)
*/

// --- 1. PRODUCT DATABASE ---
const PRODUCTS = [
    {
        id: "gold_royale",
        name: "Vaidora Gold Royale",
        tagline: "The Crown Jewel of Olfaction",
        gender: "Unisex",
        type: "Woody & Spicy",
        notes: {
            top: "Saffron, Nutmeg",
            heart: "Agarwood (Oud), Patchouli",
            base: "Sandalwood, Musk, Amber"
        },
        lasting: "12-14 Hours",
        collection: "Best Sellers",
        prices: {
            "3ml": 199,
            "6ml": 349,
            "50ml": 699
        },
        image: "images/perfume_gold.jpg",
        description: "A majestic symphony of dark Cambodian Oud interwoven with gold saffron strands and rich patchouli. Crafted for royalty and designed to turn heads in any room."
    },
    {
        id: "rose_velvet",
        name: "Vaidora Rose Velvet",
        tagline: "Sensual Floral Opulence",
        gender: "Women",
        type: "Floral & Amber",
        notes: {
            top: "Damask Rose, Pink Pepper",
            heart: "Praline, Clove, Red Berries",
            base: "Vanilla, Ambergris, Cashmere Wood"
        },
        lasting: "10-12 Hours",
        collection: "Luxury Collection",
        prices: {
            "3ml": 199,
            "6ml": 349,
            "50ml": 699
        },
        image: "images/perfume_rose.jpg",
        description: "Velvety crimson roses steeped in luxurious sweet praline, balanced by exotic warm cloves and rich, powdery vanilla. The ultimate scent of modern romance."
    },
    {
        id: "ocean_breeze",
        name: "Vaidora Ocean Breeze",
        tagline: "Crisp Marine Freedom",
        gender: "Men",
        type: "Fresh & Aquatic",
        notes: {
            top: "Grapefruit, Sea Salt, Sage",
            heart: "Seaweed, Ambrette Seed, Cyclamen",
            base: "Cedarwood, Driftwood, Oakmoss"
        },
        lasting: "8-10 Hours",
        collection: "Summer Collection",
        prices: {
            "3ml": 199,
            "6ml": 349,
            "50ml": 699
        },
        image: "images/perfume_ocean.jpg",
        description: "A refreshing, windswept shoreline escape. Zesty grapefruit and crunching sea salt merge with earthy sage and wet ocean driftwood for absolute fresh vitality."
    },
    {
        id: "noir_intense",
        name: "Vaidora Noir Intense",
        tagline: "Intrigue of the Midnight Hour",
        gender: "Unisex",
        type: "Oriental & Gourmand",
        notes: {
            top: "Dark Cacao, Cardamom",
            heart: "Roasted Coffee, Tobacco Leaf",
            base: "Leather, Tonka Bean, Vetiver"
        },
        lasting: "12+ Hours",
        collection: "Luxury Collection",
        prices: {
            "3ml": 199,
            "6ml": 349,
            "50ml": 699
        },
        image: "images/perfume_noir.jpg",
        description: "Mysterious, dark, and intoxicatingly addictive. Rich cocoa beans and fresh roasted espresso blend with smoked tobacco leaves and smooth masculine leather."
    },
    {
        id: "citrus_elixir",
        name: "Vaidora Citrus Elixir",
        tagline: "Sun-drenched Mediterranean Zest",
        gender: "Unisex",
        type: "Fresh & Citrus",
        notes: {
            top: "Bergamot, Sicilian Lemon, Neroli",
            heart: "Orange Blossom, White Tea, Jasmine",
            base: "White Musk, Vetiver"
        },
        lasting: "8-10 Hours",
        collection: "Summer Collection",
        prices: {
            "3ml": 199,
            "6ml": 349,
            "50ml": 699
        },
        image: "images/perfume_citrus.jpg",
        description: "Brilliant sparkling sunshine captured in a bottle. Radiant Italian bergamot, zesty lemons, and orange blossoms, yielding to a clean base of white musk."
    },
    {
        id: "jasmine_blossom",
        name: "Vaidora Jasmine Blossom",
        tagline: "Delicate Night Floral",
        gender: "Women",
        type: "Floral & Sweet",
        notes: {
            top: "Star Jasmine, Pear Blossom",
            heart: "Gardenia, Tuberose, Sandalwood",
            base: "Whipped Vanilla, Musk"
        },
        lasting: "10-12 Hours",
        collection: "Best Sellers",
        prices: {
            "3ml": 199,
            "6ml": 349,
            "50ml": 699
        },
        image: "images/perfume_jasmine.jpg",
        description: "An ethereal night garden in peak bloom. Lush star jasmine, blooming gardenia flowers, and pear nectar wrapped in a cozy cloud of whipped creamy vanilla."
    }
];

// --- 2. GLOBAL STATE ---
let cart = JSON.parse(localStorage.getItem("vaidora_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("vaidora_wishlist")) || [];
let activeCoupon = localStorage.getItem("vaidora_active_coupon") || null;

// --- 3. ON DOCUMENT READY ---
document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initMobileMenu();
    initDrawers();
    initCheckoutModal();
    updateCounters();
    renderCart();
    renderWishlist();
    injectFloatingWhatsApp();
    setupGlobalEventListeners();
});

// --- 4. HEADER & NAV FUNCTIONS ---
function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) return;
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-menu");
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        nav.classList.toggle("active");
    });
    
    // Close mobile menu on nav link click
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            toggle.classList.remove("active");
            nav.classList.remove("active");
        });
    });
}

// --- 5. DRAWER FUNCTIONS (CART & WISHLIST) ---
function initDrawers() {
    // Inject Drawer HTML Structure into body if not present
    if (!document.querySelector(".drawer-overlay")) {
        const drawerHtml = `
            <div class="drawer-overlay"></div>
            
            <!-- Wishlist Drawer -->
            <div id="wishlist-drawer" class="drawer drawer-left">
                <div class="drawer-header">
                    <h3 class="drawer-title">My Wishlist</h3>
                    <button class="drawer-close" onclick="toggleDrawer('wishlist', false)">&times;</button>
                </div>
                <div class="drawer-content" id="wishlist-drawer-content">
                    <!-- Wishlist items loaded here -->
                </div>
            </div>

            <!-- Cart Drawer -->
            <div id="cart-drawer" class="drawer">
                <div class="drawer-header">
                    <h3 class="drawer-title">Shopping Bag</h3>
                    <button class="drawer-close" onclick="toggleDrawer('cart', false)">&times;</button>
                </div>
                <div class="drawer-content" id="cart-drawer-content">
                    <!-- Cart items loaded here -->
                </div>
                <div class="drawer-footer" id="cart-drawer-footer">
                    <!-- Summary, coupons & checkout -->
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", drawerHtml);
    }

    // Attach trigger clicks to headers
    const cartBtn = document.querySelector(".cart-trigger");
    const wishlistBtn = document.querySelector(".wishlist-trigger");
    const overlay = document.querySelector(".drawer-overlay");

    if (cartBtn) cartBtn.addEventListener("click", (e) => { e.preventDefault(); toggleDrawer("cart", true); });
    if (wishlistBtn) wishlistBtn.addEventListener("click", (e) => { e.preventDefault(); toggleDrawer("wishlist", true); });
    if (overlay) overlay.addEventListener("click", () => {
        toggleDrawer("cart", false);
        toggleDrawer("wishlist", false);
    });
}

function toggleDrawer(type, show) {
    const drawer = document.getElementById(`${type}-drawer`);
    const overlay = document.querySelector(".drawer-overlay");
    
    if (!drawer || !overlay) return;

    if (show) {
        // Close other drawer first
        document.querySelectorAll(".drawer").forEach(d => d.classList.remove("active"));
        drawer.classList.add("active");
        overlay.classList.add("active");
        
        if (type === "cart") renderCart();
        if (type === "wishlist") renderWishlist();
    } else {
        drawer.classList.remove("active");
        overlay.classList.remove("active");
    }
}

// --- 6. STATE MANIPULATION & BADGES ---
function updateCounters() {
    const cartBadges = document.querySelectorAll(".cart-count");
    const wishlistBadges = document.querySelectorAll(".wishlist-count");

    // Total Cart Items
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadges.forEach(badge => {
        badge.textContent = totalCartItems;
        badge.style.display = totalCartItems > 0 ? "flex" : "none";
    });

    // Total Wishlist Items
    const totalWishlistItems = wishlist.length;
    wishlistBadges.forEach(badge => {
        badge.textContent = totalWishlistItems;
        badge.style.display = totalWishlistItems > 0 ? "flex" : "none";
    });
}

function addToCart(productId, size, quantity) {
    quantity = parseInt(quantity) || 1;
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const unitPrice = product.prices[size];
    
    // Check if item already exists in cart with same size
    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            size: size,
            price: unitPrice,
            quantity: quantity,
            image: product.image
        });
    }

    localStorage.setItem("vaidora_cart", JSON.stringify(cart));
    updateCounters();
    renderCart();
    showToast(`Added ${quantity}x ${product.name} (${size}) to Bag!`, true);
    
    // Auto open cart drawer to verify
    setTimeout(() => toggleDrawer("cart", true), 300);
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    localStorage.setItem("vaidora_cart", JSON.stringify(cart));
    updateCounters();
    renderCart();
    showToast("Removed item from Shopping Bag.", false);
}

function updateCartQuantity(productId, size, change) {
    const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity <= 0) {
        removeFromCart(productId, size);
    } else {
        localStorage.setItem("vaidora_cart", JSON.stringify(cart));
        updateCounters();
        renderCart();
    }
}

function toggleWishlist(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const index = wishlist.indexOf(productId);
    let added = false;
    
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
        added = true;
    }

    localStorage.setItem("vaidora_wishlist", JSON.stringify(wishlist));
    updateCounters();
    renderWishlist();
    
    // Sync any heart buttons on page
    document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`).forEach(btn => {
        btn.classList.toggle("active", added);
        btn.innerHTML = added ? "❤️" : "🤍";
    });

    showToast(added ? `${product.name} added to Wishlist ❤️` : `${product.name} removed from Wishlist.`, added);
}

// --- 7. DRAWERS RENDER LOGIC ---
function renderCart() {
    const content = document.getElementById("cart-drawer-content");
    const footer = document.getElementById("cart-drawer-footer");
    
    if (!content || !footer) return;

    if (cart.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛍️</div>
                <p>Your shopping bag is empty</p>
                <a href="shop.html" class="btn btn-secondary" style="margin-top:20px;" onclick="toggleDrawer('cart', false)">Shop Fragrances</a>
            </div>
        `;
        footer.innerHTML = "";
        return;
    }

    // Render items
    let itemsHtml = "";
    cart.forEach(item => {
        itemsHtml += `
            <div class="drawer-item">
                <div class="drawer-item-img">
                    <div class="perfume-placeholder" style="height:100%; border:none;">
                        <span class="placeholder-icon" style="font-size:1.5rem; margin:0;">✨</span>
                    </div>
                </div>
                <div class="drawer-item-details">
                    <div>
                        <h4 class="drawer-item-name">${item.name}</h4>
                        <div class="drawer-item-meta">Size: ${item.size}</div>
                        <div class="drawer-item-price">₹${item.price} each</div>
                    </div>
                    <div class="drawer-item-actions">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="updateCartQuantity('${item.id}', '${item.size}', -1)">-</button>
                            <input type="text" class="qty-input" value="${item.quantity}" readonly>
                            <button class="qty-btn" onclick="updateCartQuantity('${item.id}', '${item.size}', 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}', '${item.size}')">🗑️ Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
    content.innerHTML = itemsHtml;

    // Calculate Totals and apply coupon logic
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    let shipping = subtotal >= 500 ? 0 : 80; // Free shipping above ₹500
    
    // Smart Combo Deal logic: 2 Perfumes for ₹999
    // If the active coupon is VAIDORA2, or if they have 2 items in their cart, we can show a prompt.
    // Let's implement an AUTO-APPLIED combo logic if they have the coupon or if we trigger it.
    // Let's say if active coupon is "VAIDORA2", we group items into pairs and give them the ₹999 combo price.
    // E.g., for every 2 items of any fragrance/size, they cost a total of ₹999 instead of their original sum.
    let appliedDiscountLabel = "";
    if (activeCoupon === "VAIDORA2") {
        // To make "2 for 999" valid, we calculate the total quantity in the cart.
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (totalQty >= 2) {
            // Group items and apply the ₹999 combo deal.
            // Let's sort all cart items by price (ascending or descending) to calculate discount fairly.
            // A simple logic: pairs of 2 are charged at ₹999.
            // E.g., if there are 2 items: total original price vs ₹999.
            // Let's list all items in a flat array:
            let flatPrices = [];
            cart.forEach(item => {
                for (let i = 0; i < item.quantity; i++) {
                    flatPrices.push(item.price);
                }
            });
            
            // Sort high to low
            flatPrices.sort((a, b) => b - a);
            
            let originalSum = flatPrices.reduce((s, p) => s + p, 0);
            let comboSum = 0;
            let pairsCount = Math.floor(flatPrices.length / 2);
            
            // Charge pairs at 999 total (i.e. 499.5 each)
            for (let i = 0; i < pairsCount * 2; i++) {
                comboSum += 499.5;
            }
            // Add remaining odd items at original price
            for (let i = pairsCount * 2; i < flatPrices.length; i++) {
                comboSum += flatPrices[i];
            }
            
            discount = originalSum - comboSum;
            appliedDiscountLabel = `Combo Deal Applied (${pairsCount} Combo[s])`;
        } else {
            // Not enough items for combo
            activeCoupon = null;
            localStorage.removeItem("vaidora_active_coupon");
            appliedDiscountLabel = "Combo requires min. 2 items";
        }
    } else if (activeCoupon === "FIRST15" || activeCoupon === "SUMMER15") {
        discount = Math.round(subtotal * 0.15);
        appliedDiscountLabel = "15% off Applied";
    }

    const total = subtotal - discount + shipping;

    // Render footer
    footer.innerHTML = `
        <div class="coupon-section">
            <label class="form-label" style="font-size:0.7rem;">Enter Promo Code / Coupon</label>
            <div class="coupon-input-group">
                <input type="text" id="cart-coupon-input" class="coupon-input" placeholder="e.g. VAIDORA2 or FIRST15" value="${activeCoupon || ''}">
                <button class="coupon-btn" onclick="applyCouponCode()">Apply</button>
            </div>
            <div id="coupon-msg" class="coupon-message"></div>
            <p style="font-size: 0.65rem; color: var(--gold); margin-top: 5px;">🔥 Tip: Use code <b>VAIDORA2</b> for "2 Perfumes for ₹999" combo!</p>
        </div>
        
        <div class="cart-summary-row">
            <span>Bag Subtotal</span>
            <span>₹${subtotal}</span>
        </div>
        ${discount > 0 ? `
        <div class="cart-summary-row" style="color: #4caf50;">
            <span>Discount (${appliedDiscountLabel})</span>
            <span>- ₹${discount}</span>
        </div>
        ` : ''}
        <div class="cart-summary-row">
            <span>Estimated Shipping</span>
            <span>${shipping === 0 ? '<span style="color:#4caf50;">FREE</span>' : `₹${shipping}`}</span>
        </div>
        <div class="cart-summary-row total">
            <span>Grand Total</span>
            <span>₹${total}</span>
        </div>
        <button class="btn btn-primary" style="width:100%; margin-top:20px; py: 15px;" onclick="openCheckoutModal(${total}, ${subtotal}, ${discount}, ${shipping})">Proceed to Checkout</button>
    `;
}

function applyCouponCode() {
    const input = document.getElementById("cart-coupon-input");
    const msg = document.getElementById("coupon-msg");
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    
    if (code === "") {
        activeCoupon = null;
        localStorage.removeItem("vaidora_active_coupon");
        renderCart();
        return;
    }

    if (code === "VAIDORA2") {
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalQty < 2) {
            msg.textContent = "Combo requires at least 2 items in cart.";
            msg.className = "coupon-message error";
            return;
        }
        activeCoupon = "VAIDORA2";
        localStorage.setItem("vaidora_active_coupon", "VAIDORA2");
        msg.textContent = "Luxury Combo code applied successfully!";
        msg.className = "coupon-message success";
        setTimeout(renderCart, 800);
    } else if (code === "FIRST15" || code === "SUMMER15") {
        activeCoupon = code;
        localStorage.setItem("vaidora_active_coupon", code);
        msg.textContent = "15% off coupon applied successfully!";
        msg.className = "coupon-message success";
        setTimeout(renderCart, 800);
    } else {
        msg.textContent = "Invalid code. Please try 'VAIDORA2' or 'FIRST15'.";
        msg.className = "coupon-message error";
    }
}

function renderWishlist() {
    const content = document.getElementById("wishlist-drawer-content");
    if (!content) return;

    if (wishlist.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🤍</div>
                <p>Your wishlist is empty</p>
                <a href="shop.html" class="btn btn-secondary" style="margin-top:20px;" onclick="toggleDrawer('wishlist', false)">Explore Catalog</a>
            </div>
        `;
        return;
    }

    let wishlistHtml = "";
    wishlist.forEach(id => {
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) return;

        wishlistHtml += `
            <div class="drawer-item">
                <div class="drawer-item-img">
                    <div class="perfume-placeholder" style="height:100%; border:none;">
                        <span class="placeholder-icon" style="font-size:1.5rem; margin:0;">❤️</span>
                    </div>
                </div>
                <div class="drawer-item-details">
                    <div>
                        <h4 class="drawer-item-name">${product.name}</h4>
                        <div class="drawer-item-meta">${product.type} • ${product.gender}</div>
                        <div class="drawer-item-price">From ₹${product.prices["3ml"]}</div>
                    </div>
                    <div class="drawer-item-actions">
                        <button class="btn btn-link" onclick="quickWishlistAddToCart('${product.id}')" style="padding:0; border:none; text-decoration:underline;">Add 3ml to Bag</button>
                        <button class="remove-btn" onclick="toggleWishlist('${product.id}')">🗑️ Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
    content.innerHTML = wishlistHtml;
}

function quickWishlistAddToCart(productId) {
    addToCart(productId, "3ml", 1);
    // Remove from wishlist on adding to cart
    toggleWishlist(productId);
}

// --- 8. MOCK RAZORPAY & CHECKOUT SYSTEM ---
let currentCheckoutTotal = 0;
let checkoutSubtotal = 0;
let checkoutDiscount = 0;
let checkoutShipping = 0;

function initCheckoutModal() {
    if (document.getElementById("checkout-modal")) return;

    const modalHtml = `
        <div id="checkout-modal" class="modal-overlay">
            <div class="modal-box">
                <button class="modal-close" onclick="closeCheckoutModal()">&times;</button>
                <div class="modal-body" id="checkout-modal-body">
                    <!-- Dynamic Checkout or Success Form -->
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function openCheckoutModal(total, subtotal, discount, shipping) {
    currentCheckoutTotal = total;
    checkoutSubtotal = subtotal;
    checkoutDiscount = discount;
    checkoutShipping = shipping;
    
    // Close the cart drawer
    toggleDrawer("cart", false);

    const body = document.getElementById("checkout-modal-body");
    if (!body) return;

    body.innerHTML = `
        <h2 class="checkout-title">Secured Checkout</h2>
        
        <div style="margin-bottom: 25px; background:var(--bg-input); padding: 15px; border: 1px solid var(--border-gold); text-align:center;">
            <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.1em;">Total Payable Amount</span>
            <div style="font-size: 2rem; font-family:var(--font-heading); color:var(--gold); font-weight:600; margin-top:5px;">₹${total}</div>
        </div>

        <form id="checkout-form" onsubmit="handlePlaceOrder(event)">
            <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="c-name" class="form-control" placeholder="e.g. Dhruv Patel" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Mobile Number *</label>
                    <input type="tel" id="c-phone" class="form-control" placeholder="10-digit mobile number" pattern="[0-9]{10}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">WhatsApp Number (Optional)</label>
                    <input type="tel" id="c-whatsapp" class="form-control" placeholder="For instant order tracking" pattern="[0-9]{10}">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Complete Shipping Address *</label>
                <textarea id="c-address" class="form-control" rows="3" placeholder="Flat/House No, Building, Street, City, State, Pincode" style="resize:none;" required></textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Payment Method *</label>
                <div class="payment-selector">
                    <div class="payment-option active" id="pay-upi" onclick="selectPaymentMethod('UPI')">
                        <div class="payment-option-title">UPI / QR Online</div>
                        <div class="payment-option-desc">Scan Code & Pay Instantly</div>
                    </div>
                    <div class="payment-option" id="pay-cod" onclick="selectPaymentMethod('COD')">
                        <div class="payment-option-title">Cash on Delivery (COD)</div>
                        <div class="payment-option-desc">Pay ₹50 extra on delivery</div>
                    </div>
                </div>
            </div>

            <!-- Razorpay UPI Mock Panel -->
            <div class="upi-panel active" id="checkout-upi-panel">
                <p style="font-size: 0.8rem; color: var(--gold-light); margin-bottom: 15px;">Scan UPI QR Code using GPay, PhonePe, Paytm, or BHIM</p>
                <div class="upi-qr-placeholder">
                    <!-- Displaying a mocked stylized QR Code inside white border -->
                    <div style="width:100%; height:100%; border:2px solid #000; background: repeating-conic-gradient(from 45deg, #000 0% 25%, #fff 0% 50%) 50% / 15px 15px; display:flex; align-items:center; justify-content:center;">
                        <span style="background:#fff; padding:5px; font-weight:700; font-size:0.7rem; border:1px solid #000; letter-spacing:0.05em;">VAIDORA UPI</span>
                    </div>
                </div>
                <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.5;">UPI ID: <b>vaidora@upi</b></p>
                <div style="margin-top:15px; display:flex; justify-content:center; align-items:center; gap:8px;">
                    <span class="upi-verify-loading"></span>
                    <span style="font-size: 0.75rem; color:var(--gold);">Simulating Razorpay payment gateway verification...</span>
                </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:15px; margin-top:10px;">Place Secure Order</button>
        </form>
    `;

    document.getElementById("checkout-modal").classList.add("active");
}

let selectedPayment = "UPI";
function selectPaymentMethod(method) {
    selectedPayment = method;
    const upiBtn = document.getElementById("pay-upi");
    const codBtn = document.getElementById("pay-cod");
    const upiPanel = document.getElementById("checkout-upi-panel");

    if (method === "UPI") {
        upiBtn.classList.add("active");
        codBtn.classList.remove("active");
        upiPanel.classList.add("active");
        
        // Reset price display to standard total
        renderPayableTotal(currentCheckoutTotal);
    } else {
        codBtn.classList.add("active");
        upiBtn.classList.remove("active");
        upiPanel.classList.remove("active");
        
        // Add COD handling fee (₹50)
        renderPayableTotal(currentCheckoutTotal + 50);
    }
}

function renderPayableTotal(amt) {
    const displays = document.querySelectorAll("#checkout-modal-body div");
    displays.forEach(div => {
        if (div.style.fontSize === "2rem") {
            div.textContent = `₹${amt}`;
        }
    });
}

function closeCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    if (modal) modal.classList.remove("active");
}

function handlePlaceOrder(event) {
    event.preventDefault();

    const name = document.getElementById("c-name").value.trim();
    const phone = document.getElementById("c-phone").value.trim();
    const whatsapp = document.getElementById("c-whatsapp").value.trim() || phone;
    const address = document.getElementById("c-address").value.trim();
    
    // Simulate payment loading if UPI
    const btn = event.target.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="upi-verify-loading"></span> Securing Order...`;

    setTimeout(() => {
        // Generate new order
        const randId = Math.floor(100000 + Math.random() * 900000);
        const orderId = `VD-2026-${randId}`;
        const finalAmt = selectedPayment === "COD" ? currentCheckoutTotal + 50 : currentCheckoutTotal;

        const orderDetails = {
            orderId: orderId,
            customerName: name,
            phone: phone,
            whatsapp: whatsapp,
            address: address,
            paymentMethod: selectedPayment,
            items: [...cart],
            subtotal: checkoutSubtotal,
            discount: checkoutDiscount,
            shipping: checkoutShipping,
            codFee: selectedPayment === "COD" ? 50 : 0,
            grandTotal: finalAmt,
            date: new Date().toLocaleDateString(),
            status: "placed" // placed, packed, shipped, out_for_delivery, delivered
        };

        // Save order to tracking db in localStorage
        let orders = JSON.parse(localStorage.getItem("vaidora_orders")) || [];
        orders.push(orderDetails);
        localStorage.setItem("vaidora_orders", JSON.stringify(orders));

        // Create WhatsApp Inquiry / confirmation message
        let itemsSummary = cart.map(i => `${i.name} (${i.size}) x ${i.quantity}`).join(", ");
        const whatsappMsg = `Hello Vaidora Perfumes, I have placed an order!\n\nOrder ID: ${orderId}\nName: ${name}\nItems: ${itemsSummary}\nTotal: ₹${finalAmt}\nPayment: ${selectedPayment}\nAddress: ${address}\n\nPlease confirm my order. Thank you!`;
        const encodedMsg = encodeURIComponent(whatsappMsg);
        
        // Choose one of the representative contacts (Shruti or Vaidik) dynamically
        const representativePhone = "917863065807"; // Vaidik
        const waLink = `https://wa.me/${representativePhone}?text=${encodedMsg}`;

        // Clear Cart State
        cart = [];
        localStorage.setItem("vaidora_cart", JSON.stringify(cart));
        activeCoupon = null;
        localStorage.removeItem("vaidora_active_coupon");
        updateCounters();

        // Render Success Page inside Modal
        const body = document.getElementById("checkout-modal-body");
        body.innerHTML = `
            <div class="success-card">
                <div class="success-icon">✨🏆✨</div>
                <h2 class="success-title">Order Placed Successfully</h2>
                <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:10px;">Thank you for shopping with Vaidora. Your luxury fragrances are being prepared.</p>
                
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform:uppercase; letter-spacing:0.1em;">Your Order ID</span>
                <div>
                    <div class="order-id-display">${orderId}</div>
                </div>

                <div class="success-actions" style="margin-top:15px;">
                    <a href="${waLink}" target="_blank" class="btn btn-primary" style="background:#25d366; color:white; border:none; gap:8px;">
                        💬 Send WhatsApp Confirmation
                    </a>
                    <a href="tracking.html?orderId=${orderId}" class="btn btn-secondary">
                        📦 Track My Order
                    </a>
                </div>
                <div style="margin-top:20px;">
                    <a href="shop.html" style="font-size:0.8rem; color:var(--gold); text-decoration:underline;" onclick="closeCheckoutModal()">Continue Shopping</a>
                </div>
            </div>
        `;
    }, 2000);
}

// --- 9. WhatsApp FLOATING INTEGRATION ---
function injectFloatingWhatsApp() {
    if (document.querySelector(".whatsapp-widget")) return;

    // Default general WhatsApp prefilled message
    const msg = "Hello Vaidora Perfumes, I would like to inquire about your premium luxury fragrances.";
    const waLink = `https://wa.me/917863065807?text=${encodeURIComponent(msg)}`;

    const widgetHtml = `
        <a href="${waLink}" target="_blank" class="whatsapp-widget" aria-label="Chat on WhatsApp" title="Inquire on WhatsApp">
            <svg style="width: 32px; height: 32px; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.09-3.93c1.648.978 3.256 1.486 4.85 1.488 5.437-.001 9.861-4.426 9.864-9.866.002-2.637-1.023-5.112-2.887-6.978C16.15 2.846 13.67 1.82 11.03 1.82c-5.445 0-9.871 4.427-9.875 9.87-.001 1.95.51 3.55 1.478 5.176l-.968 3.535 3.623-.951zM17.13 14.36c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-0.89-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.3 1.28.49 1.72.63.73.23 1.39.2 1.92.12.58-.08 1.77-.73 2.02-1.43.25-.7.25-1.3.18-1.43-.07-.1-.28-.15-.58-.3z"/>
            </svg>
        </a>
    `;
    document.body.insertAdjacentHTML("beforeend", widgetHtml);
}

// --- 10. DYNAMIC TOAST SYSTEM ---
function showToast(message, isSuccess) {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <span class="toast-success-icon">${isSuccess ? '🏆' : '✨'}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    
    // Trigger transition
    setTimeout(() => toast.classList.add("show"), 50);

    // Remove toast after delay
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// --- 11. GENERAL EVENT LISTENERS ---
function setupGlobalEventListeners() {
    // Search Button triggers
    const searchBtns = document.querySelectorAll(".search-trigger");
    searchBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            // Redirect to shop page with search active
            window.location.href = "shop.html?focusSearch=true";
        });
    });
}
