// Variables
var map;
var service;
var infowindow;
// Requests your geolocation
// Then initializes map based on your lat and lng
navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
        lat: position.coords.latitude, 
        lng: position.coords.longitude
    };

    initialize(pos.lat, pos.lng)
  });
  
  function initialize(lat, lng) {
    var userLoc = new google.maps.LatLng(lat, lng);
  
    map = new google.maps.Map(document.getElementById('map'), {
        center: userLoc,
        zoom: 8
      });
  
    var request = {
        keyword: "brewery",
      location: userLoc,
      radius: '80000',
    //   type: ['bar']
    };
  
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(results)
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    new google.maps.Marker({
        position: place.geometry.location,
        map: map
    });
}
