// Put your zillow.com API key here
//Reference: http://api.geonames.org/
//Reference: https://developers.google.com
//Reference: http://www.geonames.org/
var username = "deekshabhat";
var request = new XMLHttpRequest();

var map;
var marker;
var result;
var infowindow;
var output;
//initMap() which initiates map to a location
function initMap() {
    var location = {lat: 32.75, lng: -97.13};
	//initialize map
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: location
        });
    marker = new google.maps.Marker({
          position: location,
          map: map
        });
   
    google.maps.event.addListener(map, 'click', function(event){
        reversegeocode(event);
    });
    //Declare an infowindow
    infowindow = new google.maps.InfoWindow({
        content: " "
    });

}

var reset = function(){
     document.getElementById("output").innerHTML = "";
};
// Reserse Geocoding 
function reversegeocode(event) {
    result = event;
    sendRequest();
}


function displayResult () {
    if (request.readyState == 4) {
        var xml = request.responseXML.documentElement;
        if(xml.getElementsByTagName("observation").length != 0){
            //Extract data from XML
            var temperature = xml.getElementsByTagName("temperature");
            // console.log(temperature[0].childNodes[0].nodeValue)
            var name = xml.getElementsByTagName("stationName")
            // console.log(name[0].childNodes[0].nodeValue)
            var cloud = xml.getElementsByTagName("clouds");
            //console.log(cloud[0].childNodes[0].data)
            var wind = xml.getElementsByTagName("windSpeed");
            //console.log(wind[0].childNodes[0].nodeValue)
            var latlng = new google.maps.LatLng(result.latLng.lat(), result.latLng.lng());
            marker.setPosition(latlng);
            //marker.customInfo = "City: " + name[0].childNodes[0].nodeValue.split(',')[0] + "\nTemperature: " + temperature[0].childNodes[0].nodeValue+ "\nWindSpeed: " + wind[0].childNodes[0].nodeValue+ "\nClouds: " + cloud[0].childNodes[0].data;
            content_data = "<p>" + "City: " + name[0].childNodes[0].nodeValue + "</p><p>Temperature: " + temperature[0].childNodes[0].nodeValue + "</p><p>WindSpeed: " + wind[0].childNodes[0].nodeValue+ "</p><p>Clouds: " + cloud[0].childNodes[0].data +"</p>";
            infowindow.setContent(content_data);
            infowindow.open(map, marker);
            var oldData = document.getElementById("output").innerHTML;
            document.getElementById("output").innerHTML =oldData+"<p>" + "City: " + name[0].childNodes[0].nodeValue.split(',')[0] + ",Temperature: " + temperature[0].childNodes[0].nodeValue + ",WindSpeed: " + wind[0].childNodes[0].nodeValue+ ",Clouds: " + cloud[0].childNodes[0].data +"</p>";
            infowindow.open(map, marker);
        }

    }
}

function sendRequest () {
    var lat = encodeURI(result.latLng.lat());
    var lng = encodeURI(result.latLng.lng());
    request.open("GET", "http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+"&username="+encodeURI(username));
    request.onreadystatechange = displayResult;
    request.send(null);
}
