function getFoodTemplate(index) {
    return `
        <section class="food-item">

            <div class="food-item-image">
                <img src="${foods[index].image}" alt="${foods[index].name}">
            </div>

            <div class="food-item-info">
                <h3>${foods[index].name}</h3>

                <p>${foods[index].description}</p>

                <span>${formatPrice(foods[index].price)} €</span>
            </div>

            <button
                class="add-button"
                type="button"
                aria-label="${foods[index].name} zum Warenkorb hinzufügen"
                onclick="addToCart(${index})">
                +
            </button>

        </section>
    `;
}

function getOrderSuccessTemplate() {
    return `
        <div class="order-success">

            <div class="order-success-card">

                <div class="success-icon">
                    🍔
                </div>

                <h2>Vielen Dank!</h2>

                <p>
                    Deine Bestellung wurde erfolgreich aufgegeben.
                </p>

                <button
                    class="success-button"
                    type="button"
                    onclick="closeOrderSuccess()">

                    Schließen

                </button>

            </div>

        </div>
    `;
}

function getCartTemplate(totalPrice, deliveryPrice) {
    return `
        ${getCloseBasketButtonTemplate()}

        ${getCartItemsTemplate()}

        ${getDeliveryTemplate()}

        ${getCartTotalTemplate(totalPrice, deliveryPrice)}

        <button class="order-button" type="button" onclick="orderNow()">
            Jetzt bestellen
        </button>
    `;
}

function getCloseBasketButtonTemplate() {
    return `
        <button
            class="close-basket-button"
            type="button"
            aria-label="Warenkorb schliessen"
            onclick="closeMobileBasket()">
            &times;
        </button>
    `;
}

function getCartItemsTemplate() {
    let cartItemsTemplate = "";

    for (let i = 0; i < cart.length; i++) {
        cartItemsTemplate += getCartItemTemplate(i);
    }

    return cartItemsTemplate;
}

function getCartItemTemplate(index) {
    return `
        <div class="cart-item">

            <div class="cart-item-name">
                <span>${cart[index].name}</span>
                <small>
                    Einzelpreis: ${formatPrice(cart[index].price)} €
                </small>
            </div>

            <div class="cart-controls">
                <button
                    type="button"
                    aria-label="Menge von ${cart[index].name} verringern"
                    onclick="decreaseAmount(${index})">-</button>
                <span>${cart[index].amount}</span>
                <button
                    type="button"
                    aria-label="Menge von ${cart[index].name} erhöhen"
                    onclick="increaseAmount(${index})">+</button>
            </div>

            <div class="cart-item-price">
                ${formatPrice(cart[index].price * cart[index].amount)} €
            </div>

        </div>
    `;
}

function getDeliveryTemplate() {
    return `
        <div class="delivery-section">

            <label>
                <input
                    type="checkbox"
                    onchange="toggleDelivery(this.checked)"
                    ${isDeliverySelected ? "checked" : ""}
                >
                Lieferung auswählen
            </label>

            ${isDeliverySelected ? getDeliverySelectTemplate() : ""}

        </div>
    `;
}

function getDeliverySelectTemplate() {
    return `
        <select id="deliveryDistance" onchange="changeDeliveryDistance()">

            <option value="10" ${selectedDeliveryDistance === 10 ? "selected" : ""}>
                Bis 10 km - 5,00 €
            </option>

            <option value="20" ${selectedDeliveryDistance === 20 ? "selected" : ""}>
                Bis 20 km - 10,00 €
            </option>

            <option value="21" ${selectedDeliveryDistance === 21 ? "selected" : ""}>
                Über 20 km - 25,00 €
            </option>

        </select>
    `;
}

function getCartTotalTemplate(totalPrice, deliveryPrice) {
    let finalPrice = totalPrice + deliveryPrice;

    return `
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
    `;
}
