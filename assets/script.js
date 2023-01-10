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
        var todayImageURL = `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`; // need to put icon number into open weather url for images
        console.log(todayImageURL);
        var oneDayAfterImageURL = `http://openweathermap.org/img/wn/${response.list[8].weather[0].icon}@2x.png`;
        var twoDayAfterImageURL= `http://openweathermap.org/img/wn/${response.list[16].weather[0].icon}@2x.png`; 
        var threeDayAfterImageURL= `http://openweathermap.org/img/wn/${response.list[24].weather[0].icon}@2x.png`;
        var fourDayAfterImageURL= `http://openweathermap.org/img/wn/${response.list[32].weather[0].icon}@2x.png`;
        var fiveDayAfterImageURL= `http://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`;
        
        // temp on that day and next 5 days, convert temp value from kelvin to deg C and round to 2dp
        var todayTempDegC = Math.round(((response.list[0].main.temp - 273.15) + Number.EPSILON) * 100) / 100; 
        var oneDayAfterTempDegC = Math.round(((response.list[8].main.temp - 273.15) + Number.EPSILON) * 100) / 100; 
        var twoDayAfterTempDegC = Math.round(((response.list[16].main.temp - 273.15) + Number.EPSILON) * 100) / 100; 
        var threeDayAfterTempDegC = Math.round(((response.list[24].main.temp - 273.15) + Number.EPSILON) * 100) / 100; 
        var fourDayAfterTempDegC = Math.round(((response.list[32].main.temp - 273.15) + Number.EPSILON) * 100) / 100; 
        var fiveDayAfterTempDegC = Math.round(((response.list[39].main.temp - 273.15) + Number.EPSILON) * 100) / 100;  
        
        // wind speed on that day and next 5 days
        var todayWindKPH = response.list[0].wind.speed;
        var oneDayAfterWindKPH = response.list[8].wind.speed;
        var twoDayAfterWindKPH = response.list[16].wind.speed;
        var threeDayAfterWindKPH = response.list[24].wind.speed;
        var fourDayAfterWindKPH = response.list[32].wind.speed;
        var fiveDayAfterWindKPH = response.list[39].wind.speed;


        // humidity on that day and next 5 days
        var todayHumidity = response.list[0].main.humidity;
        var oneDayAfterHumidity = response.list[8].main.humidity;
        var twoDayAfterHumidity = response.list[16].main.humidity;
        var threeDayAfterHumidity = response.list[24].main.humidity;
        var fourDayAfterHumidity = response.list[32].main.humidity;
        var fiveDayAfterHumidity = response.list[39].main.humidity;

        //Empty weather today section before adding new information
        $("#today").empty();

        var cardDiv= $("<div class='card'>");

        
        // append card div to weather today section
        $("#today").append(cardDiv);

        var cardBody = $("<div class='card-body'>");

        // append card body to card div
        cardDiv.append(cardBody);

        var cardHeader = $(`<h3 class='card-title'> ${locationAPI} (${todayDate}) <img src=${todayImageURL} alt="image of weather forecast"> </h3>`);
          
        // append card header to card div
        cardBody.append(cardHeader);

        var todayList =$("<ul>");
        var todayLineOne = $(`<li>Temp: ${todayTempDegC} \u00B0 C</li>`);
        var todayLineTwo = $(`<li>Wind: ${todayWindKPH} KPH</li>`);
        var todayLineThree = $(`<li>Humidity: ${todayHumidity} %</li>`);

        // append unordered list to cardBody and append list itmes to ul
        cardBody.append(todayList);
        todayList.append(todayLineOne, todayLineTwo, todayLineThree);



        //Empty forecast today section before adding new information
        $("#forecast").empty();

        var containerForecast= $("<div class='card'>");

        $("#forecast").append(containerForecast);

        var header = $("<h4>5-day forecast:</h4>");

        // rowHeader.append(header);

        containerForecast.append(header);

        var cardForecastsContainer= $("<div class='container-fluid forecastsBlock'>");

        containerForecast.append(cardForecastsContainer);

        // Forecast card 1

        var forecastOne = $("<div class='card forecasts col-lg-2 col-md-2 col-sm-12'>");

        cardForecastsContainer.append(forecastOne);

        var forecastOneCardbody = $("<div class='card-body forecasts-body'>");

        forecastOne.append(forecastOneCardbody);


        var oneDayWeatherImage = `<img src=${oneDayAfterImageURL} alt="image of weather forecast"></img>`

        var dayOneList =$("<ul>");
        var dayOneLineOne = $(`<li>Temp: ${oneDayAfterTempDegC} \u00B0 C</li>`);
        var dayOneLineTwo = $(`<li>Wind: ${oneDayAfterWindKPH} KPH</li>`);
        var dayOneLineThree = $(`<li>Humidity: ${oneDayAfterHumidity} %</li>`);

        dayOneList.append(dayOneLineOne, dayOneLineTwo, dayOneLineThree);

        forecastOneCardbody.append(oneDayAfterDate, oneDayWeatherImage, dayOneList);


        // Forecast card 2

        var forecastTwo = $("<div class='card forecasts col-lg-2 col-md-2 col-sm-12'>");

        cardForecastsContainer.append(forecastTwo);

        var forecastTwoCardbody = $("<div class='card-body forecasts-body'>");

        forecastTwo.append(forecastTwoCardbody);


        var twoDayWeatherImage = `<img src=${twoDayAfterImageURL} alt="image of weather forecast"></img>`

        var dayTwoList =$("<ul>");
        var dayTwoLineOne = $(`<li>Temp: ${twoDayAfterTempDegC} \u00B0 C</li>`);
        var dayTwoLineTwo = $(`<li>Wind: ${twoDayAfterWindKPH} KPH</li>`);
        var dayTwoLineThree = $(`<li>Humidity: ${twoDayAfterHumidity} %</li>`);

        dayTwoList.append(dayTwoLineOne, dayTwoLineTwo, dayTwoLineThree);

        forecastTwoCardbody.append(twoDayAfterDate, twoDayWeatherImage, dayTwoList);

        // Forecast card 3

        var forecastThree = $("<div class='card forecasts col-lg-2 col-md-2 col-sm-12'>");

        cardForecastsContainer.append(forecastThree);

        var forecastThreeCardbody = $("<div class='card-body forecasts-body'>");

        forecastThree.append(forecastThreeCardbody);


        var threeDayWeatherImage = `<img src=${threeDayAfterImageURL} alt="image of weather forecast"></img>`

        var dayThreeList =$("<ul>");
        var dayThreeLineOne = $(`<li>Temp: ${threeDayAfterTempDegC} \u00B0 C</li>`);
        var dayThreeLineTwo = $(`<li>Wind: ${threeDayAfterWindKPH} KPH</li>`);
        var dayThreeLineThree = $(`<li>Humidity: ${threeDayAfterHumidity} %</li>`);

        dayThreeList.append(dayThreeLineOne, dayThreeLineTwo, dayThreeLineThree);

        forecastThreeCardbody.append(threeDayAfterDate, threeDayWeatherImage, dayThreeList);

        // Forecast card 4

        var forecastFour = $("<div class='card forecasts col-lg-2 col-md-2 col-sm-12'>");

        cardForecastsContainer.append(forecastFour);

        var forecastFourCardbody = $("<div class='card-body forecasts-body'>");

        forecastFour.append(forecastFourCardbody);


        var fourDayWeatherImage = `<img src=${fourDayAfterImageURL} alt="image of weather forecast"></img>`

        var dayFourList =$("<ul>");
        var dayFourLineOne = $(`<li>Temp: ${fourDayAfterTempDegC} \u00B0 C</li>`);
        var dayFourLineTwo = $(`<li>Wind: ${fourDayAfterWindKPH} KPH</li>`);
        var dayFourLineThree = $(`<li>Humidity: ${fourDayAfterHumidity} %</li>`);

        dayFourList.append(dayFourLineOne, dayFourLineTwo, dayFourLineThree);

        forecastFourCardbody.append(fourDayAfterDate, fourDayWeatherImage, dayFourList);


    // Forecast card 5

        var forecastFive = $("<div class='card forecasts col-lg-2 col-md-2 col-sm-12'>");

        cardForecastsContainer.append(forecastFive);

        var forecastFiveCardbody = $("<div class='card-body forecasts-body'>");

        forecastFive.append(forecastFiveCardbody);


        var fiveDayWeatherImage = `<img src=${fiveDayAfterImageURL} alt="image of weather forecast"></img>`

        var dayFiveList =$("<ul>");
        var dayFiveLineOne = $(`<li>Temp: ${fiveDayAfterTempDegC} \u00B0 C</li>`);
        var dayFiveLineTwo = $(`<li>Wind: ${fiveDayAfterWindKPH} KPH</li>`);
        var dayFiveLineThree = $(`<li>Humidity: ${fiveDayAfterHumidity} %</li>`);

        dayFiveList.append(dayFiveLineOne, dayFiveLineTwo, dayFiveLineThree);

        forecastFiveCardbody.append(fiveDayAfterDate, fiveDayWeatherImage, dayFiveList);

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


