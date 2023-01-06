let userInput = $("#search-input");



$("#search-button").on("click", function (event) {
    event.preventDefault();
    searchInput = $("#search-input").val();
    addItem(searchInput);

// save to local stoarge
// create and append button

})




// Save user entries into local storage

// Setup local storage so that is storing an array
var a = [];
a.push(JSON.parse(localStorage.getItem('locations')));
localStorage.setItem('locations', JSON.stringify(a));

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
  }

// Code to prevent a user entering a value with 'enter', button must be clicked
  $(document).ready(function() {
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });
  });