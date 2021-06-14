let locationCoordinates;

L.mapbox.accessToken = 'pk.eyJ1Ijoia2Fsc21pYyIsImEiOiJjanJ3dnI2ZzkwZmZtNDRuMWN2Ymxkb3gyIn0.GAIeAW40W9zFy0YKCCb2Yw';
const mymap = L.mapbox.map('googleMap', 'mapbox.streets').setView([0.580584670867283, 32.53452250031705], 17)
    .addControl(L.mapbox.geocoderControl('mapbox.places', {
        keepOpen: false,
        autocomplete: true,
    }));
L.control.fullscreen().addTo(mymap);
L.control.locate().addTo(mymap);


const popup = L.popup();

function onMapClick(e) {

    popup
        .setLatLng(e.latlng)
        .setContent("Location Coordinates: " + e.latlng.toString())
        .openOn(mymap);
    locationCoordinates = [e.latlng.lat, e.latlng.lng];
    document.getElementById("set_location").value = "Latitude : " + e.latlng.lat + " Longitude : " + e.latlng.lng

}

mymap.on('click', onMapClick);

