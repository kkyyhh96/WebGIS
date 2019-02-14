// Load data
var loadData = function (){
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            geojsonFeature = response;

            var geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            L.geoJSON(response, {
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                onEachFeature: onEachFeature
            }).addTo(mymap);
        }
    });
}

// Define function for each feature
function onEachFeature(feature, layer) {
    //console.log(feature);
    // Get properties from features
    var city = feature.properties.City;
    var pop_1985 = feature.properties.Pop_1985;
    var pop_1990 = feature.properties.Pop_1990;
    var pop_1995 = feature.properties.Pop_1995;
    var pop_2000 = feature.properties.Pop_2000;
    var pop_2005 = feature.properties.Pop_2005;
    var pop_2010 = feature.properties.Pop_2010;
    var pop_2015 = feature.properties.Pop_2015;

    // Set the context in the popup
    var popupContent = "<h2>"+city+"</h2>"+"<table><tr><th>Year</th><th>Population</th></tr>"
    +"<tr><th>Pop 1985</th><th>"+pop_1985+"</th></tr>"
    +"<tr><th>Pop 1990</th><th>"+pop_1990+"</th></tr>"
    +"<tr><th>Pop 1995</th><th>"+pop_1995+"</th></tr>"
    +"<tr><th>Pop 2000</th><th>"+pop_2000+"</th></tr>"
    +"<tr><th>Pop 2005</th><th>"+pop_2005+"</th></tr>"
    +"<tr><th>Pop 2010</th><th>"+pop_2010+"</th></tr>"
    +"<tr><th>Pop 2015</th><th>"+pop_2015+"</th></tr></table>";

    if (feature.properties && feature.properties.popupContent) {
		popupContent += feature.properties.popupContent;
	}

	layer.bindPopup(popupContent); 
}


// Init the map
var mymap = L.map('mapid').setView([0, 0], 3);

// Load geoJSON data
loadData();

// Load the tiled layer
L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=sk.eyJ1Ijoia2t5eWhoOTYiLCJhIjoiY2pzM3J0aWR3MmltYTQ5cXJleHliZDUzdyJ9.4enHtAI7j_760lP8xPqc8Q', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 8,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1Ijoia2t5eWhoOTYiLCJhIjoiY2pzM3J0aWR3MmltYTQ5cXJleHliZDUzdyJ9.4enHtAI7j_760lP8xPqc8Q',
}).addTo(mymap);
