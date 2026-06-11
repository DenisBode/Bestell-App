function initializeApp() {
    loadCart();
    loadDeliverySettings();

    renderFoods("burger", "burgerContent");
    renderFoods("pizza", "pizzaContent");
    renderFoods("salad", "saladContent");

    renderCart();
    updateBasketBubble();
}
