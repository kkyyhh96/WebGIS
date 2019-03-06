var map = L.map('mapid5').setView([0, 0], 3);

// Calculate the radius of circles
function calcSeqRadius(value){
    var scaleFactor = 50;
    var area = value * scaleFactor;
    var radius = Math.sqrt(area*1.0 / Math.PI);
    return radius;
}

// Get all attributes
function processData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with population values
        if (attribute.indexOf("Pop") > -1){
            attributes.push(attribute);
        };
    };

    //check result
    console.log(attributes);

    return attributes;
};

// Resize proportional symbols according to new attribute values
function updatePropSymbols(map, attribute){
    map.eachLayer(function(layer){
        // Not all layers have features and only choose with attributes
        if (layer.feature && layer.feature.properties[attribute]){
            //access feature properties
            var props = layer.feature.properties;

            //update each feature's radius based on new attribute values
            var radius = calcSeqRadius(props[attribute]);
            layer.setRadius(radius);

            //add city to popup content string
            var popupContent = "<p><b>City:</b> " + props.City + "</p>";

            //add formatted attribute to panel content string
            var year = attribute.split("_")[1];
            popupContent += "<p><b>Population in " + year + ":</b> " + props[attribute] + " million</p>";

            //replace the layer popup
            layer.bindPopup(popupContent, {
                offset: new L.Point(0,-radius)
            });
        };
    });
};


// Add circle markers for point features to the map
function createSeqSymbols(data, map, attributes){
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
            attName = "Pop_1985";
            attValue = feature.properties[attName];
            geojsonMarkerOptions.radius = calcSeqRadius(attValue); // Calculate the radius of circle

            var layer = L.circleMarker(latlng, geojsonMarkerOptions);
            return layer;
        }
    }).addTo(map);
};

// Load the tiled layer
L.tileLayer(tileURL, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: YOUR_KEY,
}).addTo(map);

// Create new sequence controls
function createSeqControls(map, attributes){
    //create range input element (slider)
    $('#panel').append('<input class="range-slider" type="range">');
    $('.range-slider').attr({
        max:6,
        min:0,
        value:0,
        step:1
    });
    $('#panel').append('<button class="skip" id="forward">Skip</button>');
    $('#panel').append('<button class="skip" id="reverse">Reverse</button>');
    $('#forward').html('<img src="img/forward.png" style="height: 20px">');
    $('#reverse').html('<img src="img/reverse.png" style="height: 20px">');

    $('.skip').click(function(){
        //sequence
        var index = $('.range-slider').val();
        // increment or decrement depending on button clicked
        if ($(this).attr('id') == 'forward'){
            index++;
            // if past the last attribute, wrap around to first attribute
            index = index > 6 ? 6 : index;
        } else if ($(this).attr('id') == 'reverse'){
            index--;
            // if past the first attribute, wrap around to last attribute
            index = index < 0 ? 0 : index;
        };

        // update slider
        $('.range-slider').val(index);
        //console.log(attributes);
        updatePropSymbols(map, attributes[index]);
    });

    // input listener for slider
    $('.range-slider').on('input', function(){
        //sequence
        index = $('.range-slider').val();
        //console.log(attributes);
        updatePropSymbols(map, attributes[index]);
    });
};

function getData(map){
    console.log(map);
    //load the data
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            var attributes = processData(response);

            //call function to create proportional symbols
            createSeqSymbols(response, map, attributes);
            createSeqControls(map, attributes);
        }
    });
};
$(document).ready(getData(map));