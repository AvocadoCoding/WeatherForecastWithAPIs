let userInput = $("#search-input");

// To do:
// - call lat and lon api - then input info into api for calling weather - use ajax GET funciton to call API's and use response to take appropriate data from them
// - dynamically create weather card elements for forecast, asigning values from API info- also need function to trigger api whne button is clicked




function displayWeatherInfo (locationName)  {
  
    // const movieName = $(this).attr('data-name');
  
  
    console.log(locationName);
  
  
    /* var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
  
      $("#movies-view").empty()
  
      var movieDiv = $("<div class='movie'>");
  
  
      var rating = response.Rated;
      var released = response.Released;
      var plot = response.Plot;
      var imgURL = response.Poster;
  
      var pOne = $("<p>").text("Rating: " + rating);
      var pTwo = $("<p>").text("Released: " + released);
      var pThree = $("<p>").text("Plot: " + plot);
      var image = $("<img>").attr("src", imgURL);
  
      movieDiv.append(pOne,pTwo,pThree,image);
      $("#movies-view").prepend(movieDiv);
  
  
    }); */
  }

// for loop to create new buttons from local storage on page reload 


// click functionality added to search button
$("#search-button").on("click", function (event) {
    event.preventDefault();
    searchInput = $("#search-input").val();
    // save user entry to local stoarge
    addItem(searchInput);
    // create and append button
    appendButton();
    displayWeatherInfo(searchInput);
})

// This command calls the displayWeatherInfoAppended function when an element in the document
// in the class ".added-buttons" is clicked on 
$(document).on("click",".added-buttons",displayWeatherInfoAppended);


// This function takes the data name value of the selected element and sends it
// to the displayWeatherInfo function

function displayWeatherInfoAppended(event){
    event.preventDefault();
    console.log($(this).attr('data-name'));
    displayWeatherInfo($(this).attr('data-name'));

}



// Setup local storage so that is storing an array
/* var a = [];
a.push(JSON.parse(localStorage.getItem('locations')));
localStorage.setItem('locations', JSON.stringify(a)); */

// Save user entries into local storage

function addItem(add_item) {

    // parse existing storage key or string representation of empty array (uses || operator, means
    // to take "lis_items" or if that is false take empty array '[]')
    var existingEntries = JSON.parse(localStorage.getItem("locations") || '[]');
  
    // Add item if it's not already in the array, then store array again
    if (!existingEntries.includes(add_item)) {
      existingEntries.push(add_item);
      localStorage.setItem("locations", JSON.stringify(existingEntries));
    }else{
       // or tell user it's already there
       console.log(add_item + ' already exists')
    }
  };

// Code to prevent a user entering a value with 'enter', button must be clicked
$(document).ready(function() {
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });
});


// Function to add buttons to web page  
function appendButton(){

// Deleting the buttons prior to adding new movies
  // (this is necessary otherwise there will be repeat buttons)
  $(".list-group").empty();

  // Take array of locations from local storage and loop through them
  var locations = JSON.parse(localStorage.getItem("locations"));

  for (var i = 0; i < locations.length; i++) {

    // Then dynamicaly generating buttons for each location in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var newBtn = $("<button>");
    // Adding a type to the button
    // newBtn.addType("button");
    // Adding a class of movie to our button
    newBtn.addClass("btn btn-secondary btn-block w-100 rounded mt-3 added-buttons");
    // Adding a data-attribute
    newBtn.attr("data-name", locations[i]);
    // Providing the initial button text
    newBtn.text(locations[i]);
    // Adding the button to the "list-group" div
    $(".list-group").append(newBtn);
  }
};


// Add buttons to page from local storage when page is reloaded
appendButton();


