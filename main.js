let todaysDate = new Date();
let date =
  todaysDate.getMonth() +
  1 +
  "/" +
  todaysDate.getDate() +
  "/" +
  todaysDate.getFullYear();

let zip;
let api = "d34d66b5d0f82dc037577c366bb5c06e";

//main function, calls getWeather
let mainCall = function() {
  zip = $("#zip").val();
  console.log(zip);
  getWeather();
};

//calls main function on click
$("button").on("click", () => {
  mainCall();
  $("button").toggleClass("active");
  // $('#description').remove();
});

//calls main function when Enter is pressed
$(document).keypress(function(e) {
  if (e.which == 13) {
    mainCall();
  }
});

const getWeather = () => {
  $("#date").html(date);
  $("#map").css("visibility", "visible");

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${api}`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      let temp = json.main.temp;
      let minTemp = json.main.temp_min;
      let maxTemp = json.main.temp_max;

      if (temp > 305) {
        $("#current-temp").css("color", "red");
      } else if (temp < 277) {
        $("#current-temp").css("color", "blue");
      }

      $("#location").html(json.name);
      $("#current-temp").html(`${Math.floor((temp * 9) / 5 - 459)}F˚`);
      $("#low-high").html(
        `low: ${Math.floor((minTemp * 9) / 5 - 459)}F˚/ high: ${Math.floor(
          (maxTemp * 9) / 5 - 459
        )}F˚`
      );

      for (let i = 0; i < json.weather.length; i++) {
        $("#description").append(`${json.weather[i].description} / `);
        $("#description").css("textTransform", "capitalize");
      } //use string method, remove last elemnt from string

      let latitude = json.coord.lat;
      let longitude = json.coord.lon;

      myMap(latitude, longitude);
    });
};

function myMap(lat, lon) {
  var mapOptions = {
    center: new google.maps.LatLng(lat, lon),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.MAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

myMap();
