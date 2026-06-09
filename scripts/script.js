function renderFoods(selectedCategory, containerId) {
    let menuContent = document.getElementById(containerId);

    menuContent.innerHTML = "";

    for (let i = 0; i < foods.length; i++) {
        if (foods[i].category === selectedCategory) {
            menuContent.innerHTML += getFoodTemplate(i);
        }
    }
}

renderFoods("burger", "burgerContent");
renderFoods("pizza", "pizzaContent");
renderFoods("salad", "saladContent");



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

    renderCart();
}

function renderCart() {
    let cartContent = document.getElementById("cartContent");

    cartContent.innerHTML = "";
    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].amount;

        cartContent.innerHTML += `
            <div class="cart-item">
                <span>${cart[i].amount}x ${cart[i].name}</span>
                <span>${(cart[i].price * cart[i].amount).toFixed(2)} €</span>
            </div>
        `;
    }

    cartContent.innerHTML += `
        <div class="cart-total">
            Gesamt: ${totalPrice.toFixed(2)} €
        </div>
       <button class="order-button" onclick="orderNow()">
        Jetzt bestellen
    </button>
    `;
}

function orderNow() {
    console.table(cart);
}