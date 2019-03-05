var map = L.map('mapid4').setView([0, 0], 3);

function calcPropRadius(value){
    var scaleFactor = 50;
    var area = value * scaleFactor;
    var radius = Math.sqrt(area*1.0 / Math.PI);
    return radius;
}

//Step 3: Add circle markers for point features to the map
function createPropSymbols(data, map){
    //create marker options
    var geojsonMarkerOptions = {
        title: 'test',
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            // Symbol size based on attName
            console.log(feature);
            attName = "Pop_2015";
            attValue = feature.properties[attName];
            geojsonMarkerOptions.radius = calcPropRadius(attValue); // Calculate the radius of circle

            /*
            var layer = L.marker(latlng, {
                title: feature.properties.City
            });
            */

            // Retrieve information of the selected point
            var layer = L.circleMarker(latlng, geojsonMarkerOptions);
            popupContent = "<h2>" + feature.properties.City + 
            "</h2><h5>Population 2015:   " + feature.properties[attName] + " Million</h5>";

            layer.on({
                mouseover: function(){
                    this.openPopup();
                },
                mouseout: function(){
                    this.closePopup();
                }
            })

            console.log(popupContent);
            // Change the location of the popup
            layer.bindPopup(popupContent, {
                offset: new L.Point(0, -geojsonMarkerOptions.radius * 3)
            });
            return layer;
        }
    }).addTo(map);
};

//Step 2: Import GeoJSON data
function getData(map){
    console.log(map);
    //load the data
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            //call function to create proportional symbols
            createPropSymbols(response, map);
        }
    });
};

// Load the tiled layer
L.tileLayer(tileURL, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: YOUR_KEY,
}).addTo(map);

$(document).ready(getData(map));