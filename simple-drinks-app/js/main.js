//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// set up the variables for the HTML tags 

const cocktailName = document.querySelector(".cocktailName");
const cocktailImg = document.querySelector("img");
const cocktailInstructions = document.querySelector(".instructions");
const cocktailIngredients = document.querySelector(".ingredients")
const cocktailMeasure = document.querySelector(".measure");
const cocktailSuggestions= document.querySelector(".suggestions")
const cocktailVideo = document.querySelector("p");
const getCocktail = document.querySelector("#drink").addEventListener("click", getDrink)
const randomDrink = document.querySelector("#randomDrink").addEventListener("click", getRandomDrink)
const displayInstructions = document.querySelector('.displayInstructions')

const displayname = document.querySelector(".display")


function clear(){
    console.clear()
    cocktailVideo.innerText = ""
    cocktailName.innerText = ""
    cocktailImg.src = ""
    cocktailIngredients.innerText = ""
    cocktailInstructions.innerText = ""
    cocktailSuggestions.innerText = ""
    cocktailMeasure.innerText = ""
}
function propertiesLoop(arr, str){
    let list = [];
    for(let i=1;property = arr[0][`${str}${i}`];i++){
        list.push(property)
    }
    return list
}

function filterDrinks(arr, userRequest){
    return arr.drinks.filter(drink => drink.strDrink.toLowerCase().includes(userRequest.toLowerCase()))
}

function getRandomDrink(){
    clear()
    const randomDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    fetch(randomDrinkURL)
    .then(response => response.json())
    .then (data =>{
        // console.log("got it")
        cocktailImg.src = data.drinks[0].strDrinkThumb;
        cocktailName.innerText = data.drinks[0].strDrink;
        displayInstructions.innerText = "Instructions:"
        cocktailInstructions.innerText = data.drinks[0].strInstructions;
        propertiesLoop(data.drinks, "strIngredient").forEach((ingredient, index) => cocktailIngredients.innerText += `\nIngredient ${index+1} - ${ingredient}`)
        propertiesLoop(data.drinks, "strMeasure").forEach((measurement, index) => cocktailMeasure.innerText += `\nMeasurement ${index+1} - ${measurement}`)
    })

}

// get the response from the server and filter by the name of the user input
function getDrink(){
    clear()
    const userRequest = document.querySelector("input").value.trim().toLowerCase(); // gets user input 
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userRequest}`)
    .then(response => response.json())
    .then(data => {
        const name = filterDrinks(data, userRequest)
        // console.log(name)
        if(name[0].strDrink.toLowerCase() === userRequest.toLowerCase()){
            clear()
            // console.log(name)
            cocktailName.innerText = name[0].strDrink;
            cocktailImg.src = name[0].strDrinkThumb;
            cocktailInstructions.innerText = name[0].strInstructions;
            displayInstructions.innerText  = "Instructions:"
            // displayname.innerText = name[0].strDrink
            // displayname.style.backgroundImage = `url(${name[0].strDrinkThumb})`
            propertiesLoop(name, "strIngredient").forEach((ingredient, index) => cocktailIngredients.innerText += `\nIngredient ${index+1} - ${ingredient}`)
            propertiesLoop(name, "strMeasure").forEach((measurement, index) => cocktailMeasure.innerText += `\nMeasurement ${index+1} - ${measurement}`)
    
            if(name.length > 1){
                cocktailSuggestions.innerText = "Similar Drinks you might enjoy: " 
                name.forEach((name, index) =>{
                    if (index > 0){
                        cocktailSuggestions.innerText += `\n${index} - ${name.strDrink}`
                    }
                })
            }

        }
        else{
            cocktailSuggestions.innerText = "Drinks You might enjoy: " 
            name.forEach((name, index) => {
                cocktailSuggestions.innerText += `\n${index+1} - ${name.strDrink}`
            });
        }
    })
    .catch(err => console.log(err))
}

