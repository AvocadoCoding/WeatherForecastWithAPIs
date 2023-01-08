let APIKey = "4b54aff90bddf446717e325ddf519d94";

// To do:
// - dynamically create weather card elements for forecast, assigning values from API info




function displayWeatherInfo (locationName)  {
  
    // const movieName = $(this).attr('data-name');
  
  
    console.log(locationName);
  
  
    let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=${APIKey}`;
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
        
        
      const lat = response[0].lat;
      const lon = response[0].lon;
      console.log(lat);
      console.log(lon);  


      let queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        // location name as written in API
        var locationAPI = response.city.name;
        console.log(locationAPI);

        // variables fordate, image, temp, wind and humidity data for the next 5 days

        // var weatherArray = response.list;
        
        // date on that day and next 5 days
        var todayDate = moment().format('DD/MM/YYYY'); // use moment to get today's date
        var oneDayAfterDate = (moment().add(1, 'days')).format('DD/MM/YYYY'); // Today + 1 day
        var twoDayAfterDate = (moment().add(2, 'days')).format('DD/MM/YYYY'); // Today + 2 days
        var threeDayAfterDate = (moment().add(3, 'days')).format('DD/MM/YYYY'); // Today + 3 days
        var fourDayAfterDate = (moment().add(4, 'days')).format('DD/MM/YYYY'); // Today + 4 days
        var fiveDayAfterDate = (moment().add(5, 'days')).format('DD/MM/YYYY'); // Today + 5 days
        
        // weather image on that day and next 5 days
        var todayImageURL = response.list[0].weather[0].icon; // need to put icon number into open weather url for images
        var oneDayAfterImageURL
        var twoDayAfterImageURL
        var threeDayAfterImageURL
        var fourDayAfterImageURL
        var fiveDayAfterImageURL
        
        // temp on that day and next 5 days
        var todayTempDegC = response.list[0].main.temp - 273.15; // convert temp value from kelvins to deg C
        var oneDayAfterTempDegC
        var twoDayAfterTempDegCL
        var threeDayAfterTempDegC
        var fourDayAfterTempDegC
        var fiveDayAfterTempDegC 
        
        // wind speed on that day and next 5 days
        var windKPH = response.list[0].wind.speed;


        // humidity on that day and next 5 days
        var humidity = response.list[0].main.humidity;

        //Empty weather today section before adding new information
        $("#today").empty();

        var cardDiv= $("<div class='card'>");

        
        // append card div to weather today section
        $("#today").append(cardDiv);

        var cardBody = $("<div class='card-body'>");

        // append card body to card div
        cardDiv.append(cardBody);

        var cardHeader = $(`<h3 class='card-title'> ${locationAPI} (${todayDate}) <h3> `);
          
        // append card header to card div
        cardBody.append(cardHeader);

        var todayList =$("<ul>");
        var todayLineOne = $(`<li>Temp:</li>`);
        var todayLineTwo = $(`<li>Wind:</li>`);
        var todayLineThree = $(`<li>Humidity:</li>`);

        // append unordered list to cardBody and append list itmes to ul
        cardBody.append(todayList);
        todayList.append(todayLineOne, todayLineTwo, todayLineThree);
    
          


     /*  $("#movies-view").empty()
  
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
      $("#movies-view").prepend(movieDiv); */

        });
  
  
    }); 
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


