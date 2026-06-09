function renderFoods(selectedCategory, containerId) {
    let menuContent = document.getElementById(containerId);

    menuContent.innerHTML = "";

    for (let i = 0; i < foods.length; i++) {
        if (foods[i].category === selectedCategory) {
            menuContent.innerHTML += getFoodTemplate(i);
        }
    }
}