/* Example from Leaflet Quick Start Guide*/

var mymap = L.map('mapid').setView([51.505, -0.09], 13);
function loadData(){
 $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            //create marker options
            var geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                }
            }).addTo(mymap);
        }
    });
}

loadData();
/*
function loadData(){
    var json_data;
    $.ajax("data/MegaCities.geojson",{
        dataType: "json",
        success: function(response){
            json_data = response;
            console.log(json_data);
            addGeoJsonLayer(json_data);
            //L.geoJSON(someFeatures, {
                    }
    });
}

var addGeoJsonLayer = function (json_data){
L.geoJSON(json_data, {
                color:'red',
                fillColor:'#f03',
                fillOpacity: 0.5,
                radius: 100000
            }).addTo(mymap);
        };


loadData();
//add geojson layer

/*var addGeoJsonLayer = L.geoJSON('data/MegaCities.geojson', {
    color:'red',
    fillColor:'#f03',
    fillOpacity: 0.5,
    radius: 100000
}).addTo(mymap);
*/

//add tile layer...replace project id and accessToken with your own
//L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.mapbox-traffic-v1/{z}/{x}/{y}.png?access_token=sk.eyJ1Ijoia2t5eWhoOTYiLCJhIjoiY2pzM3J0aWR3MmltYTQ5cXJleHliZDUzdyJ9.4enHtAI7j_760lP8xPqc8Q', {
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 4,
    //id: 'mapbox.mapbox-traffic-v1',
    //accessToken: 'sk.eyJ1Ijoia2t5eWhoOTYiLCJhIjoiY2pzM3J0aWR3MmltYTQ5cXJleHliZDUzdyJ9.4enHtAI7j_760lP8xPqc8Q'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);

marker.bindPopup("<strong>Hello world!</strong><br />I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);