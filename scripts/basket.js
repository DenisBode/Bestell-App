
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
}

function renderCart() {
    let cartContent = document.getElementById("cartContent");

    cartContent.innerHTML = "";

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <p class="cart-empty">
                Dein Warenkorb ist leer.
            </p>
        `;
        return;
    }

    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {

        totalPrice += cart[i].price * cart[i].amount;

        cartContent.innerHTML += `
            <div class="cart-item">

                <div class="cart-item-name">
                    <span>${cart[i].name}</span>
                    <small>
                        Einzelpreis: ${formatPrice(cart[i].price)} €
                    </small>
                </div>

                <div class="cart-controls">

                    <button onclick="decreaseAmount(${i})">
                        -
                    </button>

                    <span>${cart[i].amount}</span>

                    <button onclick="increaseAmount(${i})">
                        +
                    </button>

                </div>

                <div class="cart-item-price">
                    ${formatPrice(cart[i].price * cart[i].amount)} €
                </div>

            </div>
        `;
    }

    let deliveryPrice = isDeliverySelected
        ? getDeliveryPrice(selectedDeliveryDistance)
        : 0;

    let finalPrice = totalPrice + deliveryPrice;

    cartContent.innerHTML += `
        <div class="delivery-section">

            <label>
                <input
                    type="checkbox"
                    onchange="toggleDelivery()"
                    ${isDeliverySelected ? "checked" : ""}
                >

                Lieferung auswählen
            </label>

            ${isDeliverySelected ? `
                <select
                    id="deliveryDistance"
                    onchange="changeDeliveryDistance()"
                >

                    <option
                        value="10"
                        ${selectedDeliveryDistance === 10 ? "selected" : ""}
                    >
                        Bis 10 km - 5,00 €
                    </option>

                    <option
                        value="20"
                        ${selectedDeliveryDistance === 20 ? "selected" : ""}
                    >
                        Bis 20 km - 10,00 €
                    </option>

                    <option
                        value="21"
                        ${selectedDeliveryDistance === 21 ? "selected" : ""}
                    >
                        Über 20 km - 25,00 €
                    </option>

                </select>
            ` : ""}

        </div>

        <div class="cart-total">

            <div>
                Zwischensumme:
                ${formatPrice(totalPrice)} €
            </div>

            <div>
                Lieferung:
                ${formatPrice(deliveryPrice)} €
            </div>

            <div>
                Gesamt:
                ${formatPrice(finalPrice)} €
            </div>

        </div>

        <button
            class="order-button"
            onclick="orderNow()"
        >
            Jetzt bestellen
        </button>
    `;
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
}

function decreaseAmount(index) {

    if (cart[index].amount > 1) {

        cart[index].amount--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();
    renderCart();
}

function orderNow() {

    showOrderSuccess();

    cart = [];

    saveCart();
    renderCart();
}

function closeOrderSuccess() {

    document
        .getElementById("orderSuccess")
        .classList.add("hidden");
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
