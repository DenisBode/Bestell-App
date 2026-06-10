function init() {
    loadCart();

    renderFoods("burger", "burgerContent");
    renderFoods("pizza", "pizzaContent");
    renderFoods("salad", "saladContent");

    renderCart();
    updateBasketBubble();
}

init();