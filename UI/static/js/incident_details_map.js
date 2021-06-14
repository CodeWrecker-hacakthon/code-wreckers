let newlocationCoordinates;
sessionStorage.removeItem('showPopUp');

function displayMap(geoCoordinates) {
    L.mapbox.accessToken = 'pk.eyJ1Ijoia2Fsc21pYyIsImEiOiJjanJ4N3VobmgwaXF0NDluaDZxeDZ0eGx6In0.RLQH5uKvNHuKhYZXURv58A';

    const map = L.mapbox.map('googleMap', 'mapbox.streets').setView(geoCoordinates, 17)
        .addControl(L.mapbox.geocoderControl('mapbox.places', {
            keepOpen: false,
            autocomplete: true,
        }));


    const circle = L.circle(geoCoordinates, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 20
    }).addTo(map);


    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = new L.Marker(geoCoordinates).addTo(map);


    function onMapClick(e) {

        if (sessionStorage.getItem('showPopUp') === 'enabled') {

            newlocationCoordinates = [e.latlng.lat, e.latlng.lng];
            marker.setLatLng(e.latlng);

        }
    }


    map.on('click', onMapClick);
    L.control.fullscreen().addTo(map);
    L.control.locate().addTo(map);


}

