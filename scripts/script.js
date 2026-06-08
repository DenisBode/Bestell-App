function renderFoods(selectedCategory) {

    let menuContent = document.getElementById("menuContent");

    menuContent.innerHTML = "";

    for (let i = 0; i < foods.length; i++) {
        if (foods[i].category === selectedCategory) {
            menuContent.innerHTML += getFoodTemplate(i);
        }
    }
}

renderFoods("burger");