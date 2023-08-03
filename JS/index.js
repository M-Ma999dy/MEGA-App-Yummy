"use strict";

/* ----------------------------------------------------------------------------- */
/* Loader ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

window.addEventListener("load",function(){
        
  $("#loaderDiv").fadeOut(1000,function(){

    $("#myLoading").remove()

    $("body").css("overflow-y","auto")

  })

}) 

/* ----------------------------------------------------------------------------- */
/* Sharding -------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

function openLink(url){

  return   window.open(`https://${url}`,"_blank")
  
}


function openPage(pageID){

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

/* ----------------------------------------------------------------------------- */
/* Navbar ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

let hideNavbarContent = document.getElementById("hideNavbarContent")
let displayNavbarContent = document.getElementById("displayNavbarContent")

$("#displayNavbarContent").click(function(){

  $("#mega-navbar").animate({left:`0px`},750,function(){
    
    $("#nav-content1").animate({top:'0'},500,function(){

      $("#nav-content2").animate({bottom:'0'},500)

    })

  })

  displayNavbarContent.classList.add("d-none")
  hideNavbarContent.classList.remove("d-none")

})

// ---------------------
// ---------------------

$("#hideNavbarContent").click(function(){

  $("#mega-navbar").animate({left:`-200px`},750,function(){
    
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
    
    let mealsList = []

    let allMeals = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i",{
        method:"GET"
    });
    
    let allMealsNow = await allMeals.json()
    
    mealsList = allMealsNow.meals
 
    displayMeals(mealsList)
}

getAllMeals()

function displayMeals(mealsList){

    openPage('home')

    let cartona =``;

    for(let i = 0 ; i < mealsList.length ; i++){
      
      cartona +=
      `
      <div class="col-6 col-md-4 col-xl-3 my-4 megaHover">
        <button onclick="openMealD(${mealsList[i].idMeal} ,'${mealsList[i].strMeal}')" class="position-relative border-0 p-0 bg-transparent overflow-hidden">
          <img src="${mealsList[i].strMealThumb}" style="width: 180px;" alt="">
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

  let mealsListArea = []

  let allMealsArea = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list",{
      method:"GET"
  });
  
  let allMealsNowArea = await allMealsArea.json()
    
  mealsListArea = allMealsNowArea.meals

  displayMealsArea(mealsListArea)
}

getAllMealsByArea()

function displayMealsArea(mealsListArea){
  let cartona =``;
  for(let i = 0 ; i < mealsListArea.length ; i++){
    
    if (mealsListArea[i].strArea == "Unknown") {
      mealsListArea[i].strArea = "Egyptian"
    }
    cartona +=
    `
    <div class="col-6 col-md-4 col-xl-3 my-4">
      <button onclick="openMealsByArea('${mealsListArea[i].strArea}')" class="w-100 position-relative border-0 p-0 bg-transparent overflow-hidden">
        <img src="./src/Images/Logo-MM-Title.png" style="width: 150px;" alt="" class="mx-auto">
        <h3 class="text-white mt-3 mx-auto">${mealsListArea[i].strArea}</h3>
      </button>
    </div>
    `
  }
  
  document.getElementById("areaEveryMeal").innerHTML = cartona
}



async function openMealsByArea(area){
  
  let mealsListArea = []

  let allMealsArea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,{
      method:"GET"
  });
  
  let allMealsNowArea = await allMealsArea.json()
  

  mealsListArea = allMealsNowArea.meals


  displayMeals(mealsListArea)

}


/* ----------------------------------------------------------------------------- */
/* Categories ------------------------------------------------------------------ */
/* ----------------------------------------------------------------------------- */

async function getAllMealsByCategories(){

  let mealsListCategories = []

  let allMealsCategories = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php",{
      method:"GET"
  });
  
  let allMealsNowCategories = await allMealsCategories.json()

  mealsListCategories = allMealsNowCategories.categories

  displayMealsCategories(mealsListCategories)

}

getAllMealsByCategories()

function displayMealsCategories(mealsListCategories){


  let cartona =``;

  for(let i = 0 ; i < mealsListCategories.length ; i++){
    
    cartona +=
    `
    <div class="col-6 col-md-4 col-xl-3 my-4 megaHover2">
      <button onclick="openMealsByCategories('${mealsListCategories[i].strCategory}')" style="border-radius: 50px;" class="position-relative border-0 pb-4 ps-0 pe-0 pt-0 bg-transparent overflow-hidden">
        <img src="${mealsListCategories[i].strCategoryThumb}" style="width: 180px;" alt="">
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
  
  let mealsListCategories = []

  let allMealsCategories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`,{
      method:"GET"
  });
  
  let allMealsNowCategories = await allMealsCategories.json()
  
  console.log(allMealsNowCategories);


  mealsListCategories = allMealsNowCategories.meals

  displayMeals(mealsListCategories)

}

/* ----------------------------------------------------------------------------- */
/* Ingredients ----------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

let mealsListIngredients = []

async function getAllMealsByIngredients(){

  let allMealsIngredients = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list",{
      method:"GET"
  });
  
  let allMealsNowIngredients = await allMealsIngredients.json()

  mealsListIngredients = allMealsNowIngredients.meals

  displayMealsIngredients(mealsListIngredients)

}

getAllMealsByIngredients()

function displayMealsIngredients(mealsListIngredients){


  let cartona =``;

  for(let i = 0 ; i < 20 ; i++){
    
    cartona +=
    `
    <div class="col-6 col-md-4 col-xl-3 my-4">
      <button onclick="displayIngredientsDet(${i})" style="border-radius: 50px;" class="position-relative border-0 pb-4 ps-0 pe-0 pt-0 bg-transparent overflow-hidden">
        <img src="https://www.themealdb.com/images/ingredients/${mealsListIngredients[i].strIngredient}.png" style="width: 180px;" alt="">
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
      <img src="https://www.themealdb.com/images/ingredients/${mealsListIngredients[index].strIngredient}.png" class="mx-auto" style="width: 250px;" alt="">
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

      let mealD = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,{
          method:"GET"
      });

      let newMealD = await mealD.json()

      mealDet = newMealD.meals
    
      displayMeals()
  }

  getAllMeals()

  function displayMeals(){
      let cartona =``;
      for(let i = 0 ; i < mealDet.length ; i++){

        if (mealDet[i].strTags == null) {

          mealDet[i].strTags = "Food"
          
        }
        cartona +=
        `
        <div class="container">

            <div class="row">

                <div class="col-lg-5 ps-0">
                    <img src="${mealDet[i].strMealThumb}" class="w-100" alt="">
                </div>


                <div class="col-lg-7 mt-4 mt-lg-0 text-start d-flex flex-column justify-content-between align-items-start ps-3 border-start">

                  <div class=" d-flex justify-content-between align-items-Center w-100">

                    <div>

                      <h2 class="mb-4 fw-bold">${nameOfMeal}</h2>

                      <h5 class="my-3 fw-light"><span class="fw-bold">Area : </span> ${mealDet[i].strArea} </h5>
                      <h5 class="my-3 fw-light"><span class="fw-bold">Category : </span> ${mealDet[i].strCategory} </h5>

                      <h5 class="my-3 fw-light"><span class="fw-bold my-3">Tags : </span> ${mealDet[i].strTags} </h5>

                      <div class="my-4">
                          <a class="btn btn-success text-white me-1" target="_blank" href="${mealDet[i].strSource}">Source</a>
                          <a class="btn btn-danger youtube text-white ms-1" target="_blank" href="${mealDet[i].strYoutube}">Youtube</a>
                      </div>

                    </div>

                    <div class="d-flex flex-column justify-content-center align-items-center d-none d-sm-block">
                      <img class="mb-3" style="width: 180px; height: 180px;" src="./src/Images/Logo-MM-Title.png" alt="">
                      <h2 class="m-0 text-center">MEGA</h2>
                    </div>

                  </div>

                  <div>
                    <h4 class="mb-3 fw-bold"> Instructions </h4>
                    <p class="m-0">${mealDet[i].strInstructions}</p>
                  </div>

                </div>

            </div>

        </div>
        `
      }

      document.getElementById("mealD").innerHTML = cartona
  }

}


