
var map, infoWindow, marker;
var destinations = [];
function initMap() {
  //initial position of map
map = new google.maps.Map(document.getElementById('map'), {
  //Canada 56.1304° N, 106.3468° W
  center: {lat: 51.2538, lng: -85.3232},
  zoom: 15
});

//creates marker where user clicks
google.maps.event.addListener(map, "click", function(event) {
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });
    //destinations.push(marker.position);
});
/*
var flightPath = new google.maps.Polyline({
    path: destinations,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
});

flightPath.setMap(map);
*/
infoWindow = new google.maps.InfoWindow;

// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('You are here.');
    infoWindow.open(map);
    map.setCenter(pos);

    var marker = new google.maps.Marker({position: pos, map: map});
    
    
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
	                      'Error: The Geolocation service failed. Please refresh and allow access to your location.' :
	                      'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}
