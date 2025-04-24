// get all elements
let theInput = document.querySelector(".search-input");
let searcBtn = document.querySelector(".search-btn");
let searcArea = document.querySelector(".search-area");
let resultArea = document.querySelector(".results");
let recipeDetails = document.querySelector(".recipe-details");


window.onload = function(){
    theInput.focus();
}

searcBtn.addEventListener('click', mealBoxs);
resultArea.addEventListener('click', getRecipeDetails);

function mealBoxs(){
    resultArea.innerHTML = "";
    let searchTerm = theInput.value.trim();
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`

    fetch(url)
    .then((repos) => {
        return repos.json()
    })
    .then((results) => {
        theInput.innerHTML = "";
        resultArea.innerHTML = "";

        let mealsArray = results.meals;

        if(mealsArray === null){
            resultArea.innerHTML = `<p class="no-resultes"> Oops! No Results Found</p>`
            return;
        }else if(searchTerm === ""){
            resultArea.innerHTML = `<p class="no-resultes"> Sorry! Recipe Name Can't Be Empty</p>`;
            return;
        }

        for(let i = 0; i < mealsArray.length; i++){
            resultArea.innerHTML += `
            <div class="box">
                <div class="imge">
                    <img src="${results.meals[i].strMealThumb}" alt="">
                </div>
                <div class="details">
                    <p>${results.meals[i].strMeal}</p>
                    <button class="get-recipe" data-id = "${results.meals[i].idMeal}">Get Recipe Details</button>
                </div>
            </div>
            `;
        }
    })
}

function getRecipeDetails(e){
    if(e.target.classList.contains('get-recipe')){
        if(window.matchMedia('(max-width : 767px)')){
            recipeDetails.style.width = "100%";
            recipeDetails.style.position = "fixed";
            recipeDetails.style.left = "0";
            searcArea.style.left = "-30%";
            recipeDetails.addEventListener('click', smallcancelDetails);
        }else{
            recipeDetails.addEventListener('click', cancelDetails);
        }

        let id = e.target.getAttribute('data-id');
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(url)
        .then((repos) => {
            return repos.json()
        })
        .then((results) => {

            let mealsArray = results.meals;

            for(let i = 0; i < mealsArray.length; i++){
                console.log()
                recipeDetails.innerHTML = `
                <i class="fas fa-times" id ="cancel"></i>
                <h2>${results.meals[i].strMeal}</h2>
                <p class="instructions">Instructions: </p>
                <p class="details-text">${results.meals[i].strInstructions}</p>
                <a href="#"><i class="fas fa-circle-play"></i> Watch Video</a>
                `;
            }
        })
    }
}

function cancelDetails(e){
    if(e.target.id == 'cancel'){
        recipeDetails.style.left = "-40%";
        searcArea.style.left = "0";
    }
}
function smallcancelDetails(e){
    if(e.target.id == 'cancel'){
        recipeDetails.style.left = "-40%";
        recipeDetails.style.width = "0";
        searcArea.style.left = "0";
    }
}
