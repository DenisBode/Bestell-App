function renderFoods() {

    let menuContent = document.getElementById("menuContent");

    menuContent.innerHTML = "";

    for (let i = 0; i < foods.length; i++) {

        menuContent.innerHTML += getFoodTemplate(i);

    }
}

renderFoods()