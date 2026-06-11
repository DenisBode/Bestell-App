
let isDeliverySelected = false;
let selectedDeliveryDistance = 10;
let addToCartToastTimeout;

function addToCart(index) {
    let food = foods[index];

    let cartIndex = cart.findIndex(item => item.name === food.name);

    if (cartIndex === -1) {
        cart.push({
            name: food.name,
            price: food.price,
            amount: 1
        });
    } else {
        cart[cartIndex].amount++;
    }

    saveCart();
    renderCart();
    updateBasketBubble();
    showAddToCartToast();
}

function renderCart() {
    let cartSection = document.querySelector(".cart-section");
    let cartContent = document.getElementById("cartContent");

    cartContent.innerHTML = "";

    if (cart.length === 0) {
        cartSection.classList.remove("has-items");
        cartSection.classList.remove("mobile-open");
        document.body.classList.remove("mobile-basket-open");

        renderEmptyCart(cartContent);
        return;
    }

    cartSection.classList.add("has-items");

    let totalPrice = calculateTotalPrice();
    let deliveryPrice = getSelectedDeliveryPrice();

    cartContent.innerHTML = getCartTemplate(totalPrice, deliveryPrice);
}

function renderFoods(selectedCategory, containerId) {
    let menuContent = document.getElementById(containerId);

    menuContent.innerHTML = "";

    for (let i = 0; i < foods.length; i++) {
        if (foods[i].category === selectedCategory) {
            menuContent.innerHTML += getFoodTemplate(i);
        }
    }
}

function renderEmptyCart(cartContent) {
    let cartSection = document.querySelector(".cart-section");

    cartSection.classList.remove("has-items");
    cartSection.classList.remove("mobile-open");

    cartContent.innerHTML = `
        ${getCloseBasketButtonTemplate()}

        <p class="cart-empty">
            Dein Warenkorb ist leer.
        </p>
    `;
}

function syncBasketView() {
    renderCart();
    updateBasketBubble();
}

function calculateTotalPrice() {
    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].amount;
    }

    return totalPrice;
}

function getSelectedDeliveryPrice() {
    if (isDeliverySelected) {
        return getDeliveryPrice(selectedDeliveryDistance);
    }

    return 0;
}


function toggleDelivery(isSelected) {
    isDeliverySelected = isSelected;

    saveDeliverySettings();
    renderCart();
}

function changeDeliveryDistance() {
    let deliverySelect =
        document.getElementById("deliveryDistance");

    selectedDeliveryDistance =
        Number(deliverySelect.value);

    saveDeliverySettings();
    renderCart();
}

function getDeliveryPrice(distance) {

    if (distance <= 10) {
        return 5;
    }

    if (distance <= 20) {
        return 10;
    }

    return 25;
}

function increaseAmount(index) {
    cart[index].amount++;

    saveCart();
    renderCart();
    updateBasketBubble();
}

function decreaseAmount(index) {

    if (cart[index].amount > 1) {

        cart[index].amount--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();
    renderCart();
    updateBasketBubble();
}

function orderNow() {

    showOrderSuccess();

    cart = [];

    saveCart();
    renderCart();
    updateBasketBubble();
}


function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

function loadCart() {

    let savedCart =
        localStorage.getItem("cart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveDeliverySettings() {
    localStorage.setItem(
        "isDeliverySelected",
        JSON.stringify(isDeliverySelected)
    );

    localStorage.setItem(
        "selectedDeliveryDistance",
        String(selectedDeliveryDistance)
    );
}

function loadDeliverySettings() {
    let savedDeliverySelected =
        localStorage.getItem("isDeliverySelected");

    let savedDeliveryDistance =
        localStorage.getItem("selectedDeliveryDistance");

    if (savedDeliverySelected !== null) {
        isDeliverySelected =
            JSON.parse(savedDeliverySelected);
    }

    if (savedDeliveryDistance !== null) {
        selectedDeliveryDistance =
            Number(savedDeliveryDistance);
    }
}

function formatPrice(price) {
    return price
        .toFixed(2)
        .replace(".", ",");
}

function showOrderSuccess() {

    let modalContainer =
        document.getElementById("modalContainer");

    modalContainer.innerHTML =
        getOrderSuccessTemplate();
}

function closeOrderSuccess() {

    let modalContainer =
        document.getElementById("modalContainer");

    modalContainer.innerHTML = "";
}

function updateBasketBubble() {
    const bubble = document.getElementById("basketBubble");

    let totalItems = 0;

    for (let i = 0; i < cart.length; i++) {
        totalItems += cart[i].amount;
    }

    if (!bubble) {
        return;
    }

    bubble.textContent = totalItems;

    if (totalItems === 0) {
        bubble.style.display = "none";
    } else {
        bubble.style.display = "flex";
    }
}

function showAddToCartToast() {
    let toast = document.getElementById("addToCartToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "addToCartToast";
        toast.className = "add-to-cart-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.textContent = "Artikel erfolgreich hinzugefügt";

        document.body.appendChild(toast);
    }

    clearTimeout(addToCartToastTimeout);
    toast.classList.remove("is-visible");

    requestAnimationFrame(() => {
        toast.classList.add("is-visible");
    });

    addToCartToastTimeout = setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 1800);
}

function toggleMobileBasket() {
    let cartSection = document.querySelector(".cart-section");

    cartSection.classList.toggle("mobile-open");
    document.body.classList.toggle(
        "mobile-basket-open",
        cartSection.classList.contains("mobile-open")
    );
}

function closeMobileBasket() {
    let cartSection = document.querySelector(".cart-section");

    cartSection.classList.remove("mobile-open");
    document.body.classList.remove("mobile-basket-open");
}

window.addEventListener("resize", syncBasketView);
