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

            <button class="add-button" onclick="addToCart(${index})">
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
                    onclick="closeOrderSuccess()">

                    Schließen

                </button>

            </div>

        </div>
    `;
}