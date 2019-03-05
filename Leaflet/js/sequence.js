var map = L.map('mapid5').setView([0, 0], 3);

// Load the tiled layer
L.tileLayer(tileURL, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: YOUR_KEY,
}).addTo(map);

//$(document).ready(getData(map));