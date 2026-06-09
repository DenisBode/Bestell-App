function getFoodTemplate(index) {
    return `
        <section class="food-item">

            <div class="food-item-image">
                <img src="${foods[index].image}" alt="${foods[index].name}">
            </div>

            <div class="food-item-info">
                <h3>${foods[index].name}</h3>

                <p>${foods[index].description}</p>

                <span>${foods[index].price} €</span>
            </div>

            <button class="add-button" onclick="addToCart(${index})">
    +
</button>

        </section>
    `;
}