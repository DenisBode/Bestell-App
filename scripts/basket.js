
let isDeliverySelected = false;
let selectedDeliveryDistance = 10;

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
}

function renderCart() {
    let cartSection = document.querySelector(".cart-section");
    let cartContent = document.getElementById("cartContent");

    cartContent.innerHTML = "";

    if (cart.length === 0) {
        cartSection.classList.remove("has-items");
        cartSection.classList.remove("mobile-open");
        document.body.classList.remove("mobile-basket-open");

        if (isMobileView()) {
            return;
        }

        renderEmptyCart(cartContent);
        return;
    }

    cartSection.classList.add("has-items");

    let totalPrice = calculateTotalPrice();
    let deliveryPrice = getSelectedDeliveryPrice();

    cartContent.innerHTML = getCartTemplate(totalPrice, deliveryPrice);
}

function isMobileView() {
    return window.matchMedia("(max-width: 900px)").matches;
}

function renderEmptyCart(cartContent) {
    let cartSection = document.querySelector(".cart-section");

    cartSection.classList.remove("has-items");
    cartSection.classList.remove("mobile-open");

    cartContent.innerHTML = `
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


function toggleDelivery() {
    isDeliverySelected = !isDeliverySelected;

    renderCart();
}

function changeDeliveryDistance() {
    let deliverySelect =
        document.getElementById("deliveryDistance");

    selectedDeliveryDistance =
        Number(deliverySelect.value);

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

function toggleMobileBasket() {
    let cartSection = document.querySelector(".cart-section");

    if (cart.length === 0) {
        document.body.classList.remove("mobile-basket-open");
        return;
    }

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
