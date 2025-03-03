async function getMeal(meal) {

  let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`)
  let recipes = await response.json()
  displayMeals(recipes.recipes)
  console.log(recipes.recipes);
}
getMeal("pizza")
//////////// display Meals in cards
function displayMeals(list) {
  var meals = '';
  for (let i = 0; i < list.length; i++) {
    meals += `
            <div class="col-md-3 ">
                <div class="card mb-4" >
                    <img src="${list[i].image_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${list[i].publisher}</h5>
                        <div class="card-text">
       <p >${list[i].title}</p>
    </div>
          
          <div class="d-flex justify-content-around">
            <a href="${list[i].source_url} target="_blank" class="btn btn-success">Source</a>
            <a data-bs-toggle="modal" href="#exampleModalToggle" onClick="getRecipeDetails(${list[i].recipe_id})" class="btn btn-warning">Details</a>
          </div>
        </div>
    </div> 
</div>`

  }
  document.getElementById("myRecipes").innerHTML = meals;
}



////////////////////  get Recipe Details
async function getRecipeDetails(id) {
  let details = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
  let recipe = await details.json()
  // console.log(recipe.recipe);

  let desc = ` <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <img class="modal-img" src="${recipe.recipe.image_url}" alt="">
        <h5 class="modal-title text-center my-3" id="exampleModalToggleLabel">${recipe.recipe.publisher}</h5>`

  document.getElementById("recipeDetailsContainer").innerHTML = desc
}

///////////// nav links redirect 

let buttons = document.querySelectorAll(".nav-item .nav-link")

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (e) {
    getMeal(e.target.textContent.toLowerCase());

  })

}
////// search in cards by publisher not title
document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchQuery = e.target.value.toLowerCase();
  filterMealsByTitle(searchQuery);
});


function filterMealsByTitle(searchQuery) {
  const allCards = document.querySelectorAll("#myRecipes .card");

  allCards.forEach((card) => {
    const publisher = card.querySelector(".card-title").textContent.toLowerCase();
    if (publisher.includes(searchQuery)) {
      card.parentElement.style.display = ""; 
    } else {
      card.parentElement.style.display = "none";
    }
  });
}

// ///////////////////////////////////////
// async function searchByTitle() {
//   const searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();
//   const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=pizza`);
//   const { recipes } = await response.json();

//   const filteredMeals = recipes.filter(meal => 
//     meal.title.toLowerCase().includes(searchQuery)
//   );

//   displayMeals(filteredMeals);
// }

// document.getElementById("searchInput").addEventListener("input", searchByTitle);




