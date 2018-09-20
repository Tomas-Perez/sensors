const map = L.map('map').fitWorld();


L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    title: 'google-maps'
}).addTo(map);

let marker;
let set = false;

function handleLocation(location, verb) {
    if(!set){
        const latLng = L.latLng(location.coords.latitude, location.coords.longitude);

        marker = L.marker(latLng).addTo(map);
        map.fitBounds(latLng.toBounds(400));
        map.setZoom(20);
        set = true;
    } 
    document.getElementById('geoLat').innerHTML = location.coords.latitude;
    document.getElementById('geoLon').innerHTML = location.coords.longitude;
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (location) {
        handleLocation(location, 'fetched');
    });
    navigator.geolocation.watchPosition(handleLocation);
} else {
    document.getElementById('geoBody').innerText = 'La API de localización no es soportada';
}