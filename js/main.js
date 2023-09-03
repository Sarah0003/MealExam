var siteData = document.querySelector("#siteData");
let search = document.querySelector(".search");
let timeoutId;
var spinner = document.querySelector("#spinner");
let form = document.querySelector(".contact");


//Fetch onLoadData
async function showMainPage() {
  form.innerHTML=""

  siteData.innerHTML = "";
  showLoadingSpinner();
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  var data = await response.json();
  console.log("data=", data);
  hideLoadingSpinner();
  showMeals(data.meals);
}
//End

//spinner
function showLoadingSpinner() {
  siteData.innerHTML = `

  <div class="loader position-absolute top-50 start-50 translate-middle"></div>

  `;
}

function hideLoadingSpinner() {
  siteData.innerHTML = "";
}
//end spinner
//Fetch Search by mealName
function getMealByName(mealName) {
  form.innerHTML=""
  siteData.innerHTML = "";
  showLoadingSpinner();
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let data = await response.json();

    console.log("mealsByName=", data);
    hideLoadingSpinner();
    showSearchedMeal(data.meals);
    showMeals(data.meals);
  }, 600);
}
//Fetch search by letter
function searchByFirstLetter(mLetter) {
  form.innerHTML=""
  siteData.innerHTML = "";
  showLoadingSpinner();

  timeoutId = setTimeout(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mLetter}`);
    let data = await response.json();

    console.log("mealsByName=", data);
    hideLoadingSpinner();
    showSearchedMeal(data.meals);
    showMeals(data.meals);
  }, 600);
}
function showSearchedMeal() {
  search.innerHTML = `

      <div class="col-md-6 mb-3">
        <input type="text" class="form-control rounded-2  w-75" id="searchByName" placeholder="Search by meal Name" />
      </div>
      <div class="col-md-6">
        <input  maxlength="1"  type="text" class="form-control rounded-2 w-75" id="searchByFirstLetter" placeholder="Search meal by first letter" />
      </div>
 

      `;
}
function clearSearchItems(){
  search.innerHTML = "";

}

search.addEventListener("keyup", (mealName) => {
  getMealByName(mealName.target.value);
});

search.addEventListener("keyup", (mLetter) => {
  searchByFirstLetter(mLetter.target.value);
});
//End Search
//Fetching category data
function getCategories() {
  form.innerHTML=""
  siteData.innerHTML = "";
  showLoadingSpinner();

  timeoutId = setTimeout(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    console.log("data=", data);
    hideLoadingSpinner();
    clearSearchItems();
    showCategories(data.categories);
  }, 500);
}

function showCategories(catList) {
  let cartona = "";
  for (let i = 0; i < catList.length; i++) {
    cartona += `     
  
<div class="col-md-3">
<div onclick="getMealsByCategories('${catList[i].strCategory}')" class="categoryContent text-white position-relative overflow-hidden rounded-3">
    <img src="${catList[i].strCategoryThumb}" alt="">
    <div class="categoryLayer text-center rounded-3 p-2">
      <h3 class="catHeader">${catList[i].strCategory}</h3>
      <p class="catDesc">${catList[i].strCategoryDescription.slice(0, 150)}</p>
    </div>
</div>
</div>`;
  }
  siteData.innerHTML = cartona;
}

//Fetching meal data
 function getMealsByCategories(category) {
  form.innerHTML=""
  siteData.innerHTML = "";
  showLoadingSpinner();
  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json();
    console.log("data=", data);
    hideLoadingSpinner();
    clearSearchItems()
    showMeals(data.meals);
  }, 500);

}

function showMeals(meals) {
  let mealList = "";
  for (let i = 0; i < meals.length; i++) {
    mealList += `  
  <div class="col-md-3">
  <div onclick="getMealDetails('${meals[i].idMeal}')" class="categoryContent text-white position-relative overflow-hidden rounded-3">
      <img src="${meals[i].strMealThumb}" alt="">
      <div class="categoryLayer position-absolute d-flex justify-content-center align-items-center text-center rounded-3 p-2">
        <h3 class="catHeader">${meals[i].strMeal}</h3>
      </div>
  </div>
  </div>`;
  }
  siteData.innerHTML = mealList;
}
//End


//Fetching meal Details
function getMealDetails(mealDetails) {
  console.log("mealDetails==>", mealDetails);
  form.innerHTML="";
  siteData.innerHTML = "";
  showLoadingSpinner();
  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDetails}`);
    let data = await response.json();
    console.log("getMealDetails=", data.meals);
    hideLoadingSpinner();
    clearSearchItems()
    showMealDetails(data.meals);
  }, 600);
}

function showMealDetails(meal) {
  var ingridient = "";
  for (var i = 1; i <= 20; i++) {
    if (meal[0][`strIngredient${i}`]) {
      ingridient += `
      <li class="rounded-1 p-2 m-2">${meal[0][`strMeasure${i}`]} ${
        meal[0][`strIngredient${i}`]
      }</li>
    `;
    }
  }

  var tags = "";
  var tagList = meal[0].strTags?.split(",");

if(tagList){

  for (var i = 0; i < tagList.length; i++) {
    
    tags += `
        <li class="rounded-1 p-2 me-2">${tagList[i]}</li>
    `;
  }
}
  let mealDetail = `
<div class="meals col-md-5">
<div class="img-content d-flex justify-content-center flex-column align-items-center">
<img src="${meal[0].strMealThumb}" class="rounded-2 alt="">
<div class="imgDesc pt-2 text-center">
  <h1>${meal[0].strMeal}</h1>
</div>
</div>

</div>
<div class="meals col-md-7 ">
<h1>Instructions</h1>
<p>${meal[0].strInstructions}</p>
<h5>Area:<span>${meal[0].strArea}</span></h5>
<h5>Category:<span>${meal[0].strCategory}</span></h5>
<div class="recipes">
  <h5>Recipes:</h5>
  <ul class=" d-flex flex-wrap  list-unstyled justify-content-start align-items-start ">
    ${ingridient}
  </ul>
</div>
<div class="tags">
  <h5>Tags:</h5>
  <ul class=" d-flex list-unstyled justify-content-start align-items-center">
  ${tags}
  </ul>
    <button class="btn btn-danger"><a href="${meal[0].strYoutube}" target="_blank" class="text-decoration-none">Youtube</a></button>
    <button class="btn btn-info "><a href="${meal[0].strSource}" target="_blank" class="text-decoration-none">Source</a></button>

</div>
</div>
`;
  siteData.innerHTML = mealDetail;
}
//End



//Fetching data by area
 function getMealsByArea() {
  form.innerHTML=""
  siteData.innerHTML = "";
  showLoadingSpinner();
  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await response.json();
    console.log("Area=", data);
    hideLoadingSpinner();
    showArea(data.meals);
  }, 600);
}

function showArea(areaList) {
  let areaName = "";
  for (let i = 0; i < areaList.length; i++) {
    areaName += `
  <div class="col-md-3">
    <div onclick="getMealByArea('${areaList[i].strArea}')" class="area d-flex justify-content-center flex-column align-items-center rounded-3 p-1 ">
      <img src="Images/location.png" alt="">
      <h1>${areaList[i].strArea}</h1>
    </div>
  </div>
  `;
  }
  siteData.innerHTML = areaName;
}
//End


//Fetch getMealByArea
function getMealByArea(area) {
  console.log(area);
  form.innerHTML=""

  siteData.innerHTML = "";
  showLoadingSpinner();

  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
    console.log(data);
    hideLoadingSpinner();
    showMeals(data.meals);
  }, 600); 
}
// End

//Fetching meal Ingredients
function getMealIngredients() {
  form.innerHTML=""
  siteData.innerHTML = "";
  showLoadingSpinner();
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);    
    let data = await response.json();
    console.log("getMealDetails=", data);
    hideLoadingSpinner();
    showIngredients(data.meals);
  }, 600); 
}
function showIngredients(ingredientsList) {
  let ingredientName = "";
  for (let i = 0; i < 12; i++) {
    ingredientName += `
  <div class="col-md-3">
    <div onclick="getMealByIngredient('${
      ingredientsList[i].strIngredient
    }')" class="ingredient d-flex justify-content-center flex-column align-items-center text-center rounded-3 p-2 ">
      <img src="Images/ingredient.png" alt="">
      <h3>${ingredientsList[i].strIngredient}</h3>
      <p>${ingredientsList[i].strDescription.slice(0, 70)}</p>
    </div>
  </div>
  `;
  }
  siteData.innerHTML = ingredientName;
}

//fetch getMealByIngredient
function getMealByIngredient(ingredientName) {
  siteData.innerHTML = "";
  showLoadingSpinner();

  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    let data = await response.json();
    hideLoadingSpinner();
    showMeals(data.meals);
  }, 600); 
}
//End



function contact(){
  siteData.innerHTML='';
  
  form.innerHTML=`
  <form action="" class="form-inputs position-relative">
  <h1 class=pb-2>Contact Us</h1>
  <div class="row gy-3 gx-2">
  
    <div class="col-md-6">
      <input oninput="validation()" type="text" class="form-control rounded-2" placeholder="Enter your name" id="userName"/>
      <div id="wrongName" class=" text-center p-3 bg-danger w-100 rounded-2 mt-2 mb-2 d-none">Special characters and numbers not allowed</div>
    </div>
    <div class="col-md-6">
    <input oninput="validation()" type="text" class="form-control rounded-2" placeholder="Enter your email" id="email"/>
    <div id="wrongEmail" class="text-center p-3 bg-danger w-100 rounded-2 mt-2 mb-2 d-none">Email not valid *exemple@yyy.zzz</div>
  </div>
  <div class="col-md-6">
    <input oninput="validation()" type="number" class="form-control rounded-2" placeholder="Enter your phone number" id="phoneNumber"/>
    <div id="wrongPhone" class="text-center p-3 bg-danger w-100 rounded-2 mt-2 mb-2 d-none">Enter valid Phone Number</div>
  </div>
  
  <div class="col-md-6">
    <input oninput="validation()" type="number" class="form-control rounded-2" placeholder="Enter your age" id="age"/>
  <div id="wrongAge" class="text-center p-3 bg-danger w-100 rounded-2 mt-2 mb-2 d-none">Enter valid age</div>
  </div>
  
  <div class="col-md-6">
    <input oninput="validation()" type="password" class="form-control rounded-2 password" placeholder="Enter your password" id="password"/>
    <div id="wrongPassword" class="text-center p-3 bg-danger w-100 rounded-2 mt-2 mb-2 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
  </div>
  <div class="col-md-6">
    <input oninput="validation()"  type="password" class="form-control rounded-2 password" placeholder="Repeat password" id="repassword"/>
    <div  id="wrongPassword2" class="text-center p-3 bg-danger w-100 rounded-2 mt-2 mb-2 d-none">Passwords don't match</div>
  </div>
  </div>
  <button  id="submitButton" disabled  class="btn btn-outline-danger mt-3 position-absolute top-100 start-50 translate-middle-x">submit</button>     
  
  
  </form>
  
  `
  }
  
    function validation() {
      var nameValid = validateName();
      var emailValid = validateEmail();
      var phoneValid = validatePhoneNumber();
      var ageValid = validateAge();
      var passwordValid = validatePassword();
      var rePasswordValid = validateRePassword();
      if(nameValid==true &&  emailValid==true &&  phoneValid==true &&  ageValid==true &&  passwordValid==true && rePasswordValid == true ){
        document.getElementById("submitButton").disabled = false;    
      }else{
        document.getElementById("submitButton").disabled = true;    
      }
    }
  
  function validateName() {
    var userName=document.querySelector("#userName").value;
  
    var regeName = /^[a-zA-Z ]+$/.test(userName);
    
    if (regeName == true) {
      document.getElementById("wrongName").classList.add("d-none");
      return true

    } else {
      document.getElementById("wrongName").classList.replace("d-none", "d-flex");
      return false
    }
  }

  function validateEmail() {
    var email=document.querySelector("#email").value
  
    var regeEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if (regeEmail == true) {
      document.getElementById("wrongEmail").classList.add("d-none");
      return true

    } else {
      document.getElementById("wrongEmail").classList.replace("d-none", "d-flex");
      return false

    }
  }
  
  function validatePhoneNumber() {
    var phoneNumber=document.querySelector("#phoneNumber").value;
    var regePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneNumber);
    if (regePhone == true) {
      document.getElementById("wrongPhone").classList.add("d-none");
      return true

    } else {
      document.getElementById("wrongPhone").classList.replace("d-none", "d-flex");
      return false

    }
  }

  function validateAge() {
    var age=document.querySelector("#age").value;
  
    var regeAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(age);
  
    if (regeAge == true) {
      document.getElementById("wrongAge").classList.add("d-none");
      return true

    } else {
      document.getElementById("wrongAge").classList.replace("d-none", "d-flex");
      return false

    }
  }
  
  function validatePassword() {
    var password=document.querySelector("#password").value;
  
    var regePassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(password);

    if (regePassword == true) {
      document.getElementById("wrongPassword").classList.add("d-none");
      return true
    } else {
      document.getElementById("wrongPassword").classList.replace("d-none", "d-flex");
      return false
    }



  }
  
  function validateRePassword() {
  
  
    if (document.querySelector("#repassword").value == document.querySelector("#password").value) {
      document.getElementById("wrongPassword2").classList.add("d-none");
      return true

    } else {
      document.getElementById("wrongPassword2").classList.replace("d-none", "d-flex");
      return false

    }
  }
  
  




//jquery
$(document).ready(function () {
  //loading page
  $("#spinner").fadeOut(1000, function () {
    $("#loading").fadeOut(1000, function () {
      $("body").css("overflow", "auto");
      $("#loading").remove();
    });
  });

  //Open Menue

  $("#menueIcon").click(function () {
    if ($("#menueIcon").hasClass("fa-bars")) {
      $("#menueIcon").removeClass("fa-bars").addClass("fa-xmark");
      $(".menue").animate({
        width: "80%"
      }, 500);

      $("#links a").each(function (index) {
        $(this)
          .delay(50 * index)
          .animate({
            top: "20%",
            opacity: 1
          }, 500);
      });
    } else {
      $("#menueIcon").removeClass("fa-xmark").addClass("fa-bars");
      $(".menue").animate({
        width: "0%"
      }, 500);
    }
  });
});