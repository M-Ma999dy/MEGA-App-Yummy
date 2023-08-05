"use strict";

/* ----------------------------------------------------------------------------- */
/* Loader ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

function displayLoader (key){

  if (key) {

    $("#myLoading").css("display",'flex'),(function(){

      $("#loaderDiv").css("display",'block')
      
      $("body").css("overflow-y",'hidden')
  
    })
    
  }else{

    $("#loaderDiv").fadeOut(1000,function(){

      $("#myLoading").fadeOut()
      
      $("body").css("overflow-y",'auto')
  
    })

  }
    
}

window.addEventListener("load",function(){
        
  displayLoader()

}) 
  
/* ----------------------------------------------------------------------------- */
/* Sharding -------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

function openLink(url){

  return   window.open(`https://${url}`,"_blank")
  
}

function openPage(pageID){

  if (pageID === 'search') {
    
    removeInputValue()

  }

  let allSection = document.querySelectorAll('.openClosePage')
  let page = document.getElementById(pageID)

  for (let i = 0; i < allSection.length; i++) {

    allSection[i].classList.add('d-none');
  
  }

  page.classList.remove('d-none')

  $("#mega-navbar").animate({left:`-200px`},750,function(){
    
    $("#nav-content1").animate({top:'-100%'},500,function(){

      $("#nav-content2").animate({bottom:'-100%'},500)

    })

  })

  hideNavbarContent.classList.add("d-none")

  displayNavbarContent.classList.remove("d-none")

}

function removeInputValue(){

  document.getElementById('searchEveryMeal').classList.add('d-none')

  document.getElementById('s1').value = ''
  document.getElementById('s2').value = ''

}

/* ----------------------------------------------------------------------------- */
/* Navbar ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

let hideNavbarContent = document.getElementById("hideNavbarContent")
let displayNavbarContent = document.getElementById("displayNavbarContent")

$("#displayNavbarContent").click(function(){

  $("#mega-navbar").animate({left:`0px`},500,function(){
    
    $("#nav-content1").animate({top:'0'},500,function(){

      $("#nav-content2").animate({bottom:'0'},500,function(){

        displayNavbarContent.classList.add("d-none")

        hideNavbarContent.classList.remove("d-none")
      
      })

    })

  })
  
})

// ---------------------
// ---------------------

$("#hideNavbarContent").click(function(){

  $("#mega-navbar").animate({left:`-200px`},500,function(){
    
    $("#nav-content1").animate({top:'-100%'},500,function(){

      $("#nav-content2").animate({bottom:'-100%'},500)

    })

  })

  hideNavbarContent.classList.add("d-none")

  displayNavbarContent.classList.remove("d-none")

})

/* ----------------------------------------------------------------------------- */
/* Home ------------------------------------------------------------------------ */
/* ----------------------------------------------------------------------------- */
  
async function getAllMeals(){
    
  displayLoader(1)

    let mealsList = []

    let allMeals = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i",{
        method:"GET"
    });
    
    let allMealsNow = await allMeals.json()
    
    mealsList = allMealsNow.meals
 
    displayMeals(mealsList)

    displayLoader()

}

getAllMeals()

function displayMeals(mealsList){

    openPage('home')

    let cartona =``;

    for(let i = 0 ; i < mealsList.length ; i++){
      
      cartona +=
      `
      <div class="col-md-6 col-xl-3 my-4 megaHover">
        <button onclick="openMealD(${mealsList[i].idMeal} ,'${mealsList[i].strMeal}')" class="w-100 position-relative border-0 p-0 bg-transparent overflow-hidden">
          <img class="sizeIMG" src="${mealsList[i].strMealThumb}" alt="Meal Photo">
          <div class="nameOfMeal text-black d-flex align-items-center">
              <h3>${mealsList[i].strMeal}</h3>
          </div>
        </button>
      </div>
      `
    }
    
    document.getElementById("everyMeal").innerHTML = cartona
}
    
/* ----------------------------------------------------------------------------- */
/* Area ------------------------------------------------------------------------ */
/* ----------------------------------------------------------------------------- */

async function getAllMealsByArea(){

  displayLoader(1)


  let mealsListArea = []

  let allMealsArea = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list",{
      method:"GET"
  });
  
  let allMealsNowArea = await allMealsArea.json()
    
  mealsListArea = allMealsNowArea.meals

  displayMealsArea(mealsListArea)

  displayLoader()

}



function displayMealsArea(mealsListArea){
  let cartona =``;
  for(let i = 0 ; i < mealsListArea.length ; i++){
    
    if (mealsListArea[i].strArea == "Unknown") {
      mealsListArea[i].strArea = "Egyptian"
    }
    cartona +=
    `
    <div class="col-md-6 col-xl-3 my-4">
      <button onclick="openMealsByArea('${mealsListArea[i].strArea}')" class="w-100 position-relative border-0 p-0 bg-transparent overflow-hidden">
        <img src="./src/Images/Logo-MM-Title.png" alt="Meal Photo" class="mx-auto sizeIMG">
        <h3 class="text-white mt-3 mx-auto">${mealsListArea[i].strArea}</h3>
      </button>
    </div>
    `
  }
  
  document.getElementById("areaEveryMeal").innerHTML = cartona
}



async function openMealsByArea(area){
  
  displayLoader(1)

  let mealsListArea = []

  let allMealsArea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,{
      method:"GET"
  });
  
  let allMealsNowArea = await allMealsArea.json()
  

  mealsListArea = allMealsNowArea.meals


  displayMeals(mealsListArea)

  displayLoader()

}

/* ----------------------------------------------------------------------------- */
/* Categories ------------------------------------------------------------------ */
/* ----------------------------------------------------------------------------- */

async function getAllMealsByCategories(){

  displayLoader(1)


  let mealsListCategories = []

  let allMealsCategories = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php",{
      method:"GET"
  });
  
  let allMealsNowCategories = await allMealsCategories.json()

  mealsListCategories = allMealsNowCategories.categories

  displayMealsCategories(mealsListCategories)

  displayLoader()

}


function displayMealsCategories(mealsListCategories){


  let cartona =``;

  for(let i = 0 ; i < mealsListCategories.length ; i++){
    
    cartona +=
    `
    <div class="col-md-6 col-xl-3 my-4 megaHover2">
      <button onclick="openMealsByCategories('${mealsListCategories[i].strCategory}')" style="border-radius: 50px;" class="w-100 position-relative border-0 p-0 bg-transparent overflow-hidden">
        <img src="${mealsListCategories[i].strCategoryThumb}" class="sizeIMG" alt="Meal Photo">
        <h3 class="text-white mt-1 mx-auto">${mealsListCategories[i].strCategory}</h3>
        <div class="nameOfMeal2 text-black text-center overflow-auto">
          <p class="text-black mt-2 mx-auto">${mealsListCategories[i].strCategoryDescription}</p>
        </div>
      </button>
    </div>
    `
  }
  
  document.getElementById("categoriesEveryMeal").innerHTML = cartona
}



async function openMealsByCategories(categories){
  
  displayLoader(1)

  let mealsListCategories = []

  let allMealsCategories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`,{
      method:"GET"
  });
  
  let allMealsNowCategories = await allMealsCategories.json()
  
  console.log(allMealsNowCategories);


  mealsListCategories = allMealsNowCategories.meals

  displayMeals(mealsListCategories)

  displayLoader()

}

/* ----------------------------------------------------------------------------- */
/* Ingredients ----------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

let mealsListIngredients = []

async function getAllMealsByIngredients(){

  displayLoader(1)

  let allMealsIngredients = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list",{
      method:"GET"
  });
  
  let allMealsNowIngredients = await allMealsIngredients.json()

  mealsListIngredients = allMealsNowIngredients.meals

  displayMealsIngredients(mealsListIngredients)

  displayLoader()

}



function displayMealsIngredients(mealsListIngredients){


  let cartona =``;

  for(let i = 0 ; i < 20 ; i++){
    
    cartona +=
    `
    <div class="col-md-6 col-xl-3 my-4">
      <button onclick="displayIngredientsDet(${i})" style="border-radius: 50px;" class="w-100 position-relative border-0 p-0 bg-transparent overflow-hidden">
        <img src="https://www.themealdb.com/images/ingredients/${mealsListIngredients[i].strIngredient}.png" class="sizeIMG" alt="Meal Photo">
        <h3 class="text-white mt-1 mx-auto">${mealsListIngredients[i].strIngredient}</h3>
      </button>
    </div>
    `
  }
  
  document.getElementById("ingredientsEveryMeal").innerHTML = cartona

}


function displayIngredientsDet(index){

  openPage('ingredientsDetEx')

  let cartona =
    `
      <img src="https://www.themealdb.com/images/ingredients/${mealsListIngredients[index].strIngredient}.png" class="mx-auto" style="width: 250px;" alt="Meal Photo">
      <h3 class="text-white my-5 mx-auto">${mealsListIngredients[index].strIngredient}</h3>
      <p class="text-white text-center w-75 mx-auto">${mealsListIngredients[index].strDescription}</p>
    `

    document.getElementById("ingredientsDetEx").innerHTML = cartona

  }
  
/* ----------------------------------------------------------------------------- */
/* Meal D ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

function openMealD(id,nameOfMeal){

  openPage('mealD')

  let mealDet = []

  async function getAllMeals(){

    displayLoader(1)

      let mealD = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,{
          method:"GET"
      });

      let newMealD = await mealD.json()

      mealDet = newMealD.meals
    
      displayMeals()

      displayLoader()
  }

  getAllMeals()

  function displayMeals(){

      let cartona =``;

      for(let i = 0 ; i < mealDet.length ; i++){

        if (mealDet[0].strTags == null) {

          mealDet[i].strTags = "Food"
          
        }

        cartona +=
        `
        <div class="row">
        
          <div class="col-xl-5 mb-5">

            <div>
              <img src="${mealDet[i].strMealThumb}" class="w-100" alt="Meal Photo">
            </div>
        
          </div>

          <div class="col-xl-7">

            <div class="row">

              <div class=" col-md-6 mb-5">
        
                <div class="mb-4">
        
                  <h2 class="mb-4 fw-bold">${nameOfMeal}</h2>
        
                  <h5 class="my-3 fw-light"><span class="fw-bold">Area : </span> ${mealDet[i].strArea} </h5>
                  
                  <h5 class="my-3 fw-light"><span class="fw-bold">Category : </span> ${mealDet[i].strCategory} </h5>
        
                  <h5 class="my-3 fw-light"><span class="fw-bold my-3">Tags : </span> ${mealDet[i].strTags} </h5>
        
                  <div class="my-4">

                    <a class="btn btn-success text-white me-1" target="_blank" href="${mealDet[i].strSource}">Source</a>
                      
                    <a class="btn btn-danger  text-white ms-1" target="_blank" href="${mealDet[i].strYoutube}">Youtube</a>
                  
                  </div>
        
                </div>
        
              </div>
    
    
              <div class="col-md-6 mb-5">
                
                <div class="mb-4">
        
                  <h4 class="mb-3 fw-bold"> Recipe :</h4>
        
                  <div>
        
                    <ul id="recipesList"></ul>
        
                  </div>
        
                </div>
    
              </div>


              <div class="col-md-12">

                <h4 class="mb-3 fw-bold"> Instructions :</h4>
                <p class="m-0">${mealDet[i].strInstructions}</p>

              </div>

            </div>

          </div>

        </div> 
        `
      }

      function checkRecipe(obj){

        document.getElementById("mealD").innerHTML = cartona          

            let recipes = "";

            for (let i = 1; i <= 21; i++) {

              if (obj[`strIngredient${i}`]) {

                recipes += `<li>${obj[`strMeasure${i}`]}<span class="ps-2">${obj[`strIngredient${i}`]}</span></li>`;
                              
              }

            }

            document.getElementById("recipesList").innerHTML = recipes

      }

      checkRecipe(mealDet[0])

  }

}


/* ----------------------------------------------------------------------------- */
/* Search ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

function inputNameCheckKey(key) {
  if (!key) {
    document.getElementById('searchEveryMeal').classList.add('d-none')
    return false
  }else{
    getAllMealsByName(key)
  }
}

async function getAllMealsByName(key){

  let mealsListSearch = []

  let allMealsSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`,{
      method:"GET"
  });
  
  let allMealsNowSearch = await allMealsSearch.json()
    
  mealsListSearch = allMealsNowSearch.meals

  if (!mealsListSearch) {
    mealsListSearch=[]
  }

  inputNameCheck(mealsListSearch)

}

// ----------------------------------------------------------------

function inputNameCheck(mealsListSearch){

  if (!mealsListSearch.length == 0){

      document.getElementById('inputNameWaning').classList.add('d-none')

      displayMealsSearchByName(mealsListSearch)

  }else{

    document.getElementById('inputNameWaning').classList.remove('d-none')

    document.getElementById('searchEveryMeal').classList.add('d-none')

    return false
  }

}

// ----------------------------------------------------------------


function displayMealsSearchByName(mealsList){

  let cartona =``;
  for(let i = 0 ; i < mealsList.length ; i++){
    
    cartona +=
    `
    <div class="col-md-6 col-xl-3 my-4">
      <button onclick="openMealD(${mealsList[i].idMeal} ,'${mealsList[i].strMeal}')" class="w-100 position-relative border-0 p-0 bg-transparent overflow-hidden">
        <img src="${mealsList[i].strMealThumb}" alt="Meal Photo" class="mx-auto sizeIMG">
        <h3 class="text-white mt-3 mx-auto">${mealsList[i].strMeal}</h3>
      </button>
    </div>
    `
  }
  
  document.getElementById('searchEveryMeal').classList.remove('d-none')

  document.getElementById("searchEveryMeal").innerHTML = cartona
}

// ----------------------------------------------------------------

function inputLetterValidation(key){

  let inputLetterRegex =/^[a-zA-z]{1}$/;

  if (!key) {
    document.getElementById('searchEveryMeal').classList.add('d-none')
    document.getElementById('inputLetterWaningNotFound').classList.add('d-none')
    return false
  }

  if (inputLetterRegex.test(key)){

    document.getElementById('inputLetterWaning').classList.add('d-none')

    return getAllMealsByLetter(key)

  }else if (!key) {
    
    document.getElementById('inputLetterWaning').classList.add('d-none')

  }else{

    document.getElementById('inputLetterWaning').classList.remove('d-none')

    document.getElementById('searchEveryMeal').classList.add('d-none')

    return false
  }

}

// ----------------------------------------------------------------

async function getAllMealsByLetter(key){

  let mealsListSearch = []

  let allMealsSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`,{
      method:"GET"
  });
  

  let allMealsNowSearch = await allMealsSearch.json()
    
  mealsListSearch = allMealsNowSearch.meals

  if (!mealsListSearch) {
    mealsListSearch=[]
  }

  inputLetterCheck(mealsListSearch)

}

// ----------------------------------------------------------------

function inputLetterCheck(mealsListSearch){

  if (!mealsListSearch.length == 0){

      document.getElementById('inputLetterWaningNotFound').classList.add('d-none')

      displayMealsSearchByLetter(mealsListSearch)

  }else{

    document.getElementById('inputLetterWaningNotFound').classList.remove('d-none')

    document.getElementById('searchEveryMeal').classList.add('d-none')

    return false
  }

}

// ----------------------------------------------------------------


function displayMealsSearchByLetter(mealsList){

  let cartona =``;
  for(let i = 0 ; i < mealsList.length ; i++){
    
    cartona +=
    `
    <div class="col-md-6 col-xl-3 my-4">
      <button onclick="openMealD(${mealsList[i].idMeal} ,'${mealsList[i].strMeal}')" class="w-100 position-relative border-0 p-0 bg-transparent overflow-hidden">
        <img src="${mealsList[i].strMealThumb}" alt="Meal Photo" class="mx-auto sizeIMG">
        <h3 class="text-white mt-3 mx-auto">${mealsList[i].strMeal}</h3>
      </button>
    </div>
    `
  }
  
  document.getElementById('searchEveryMeal').classList.remove('d-none')

  document.getElementById("searchEveryMeal").innerHTML = cartona

}
