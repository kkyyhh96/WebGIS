// Init the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
var mymap2 = L.map('mapid2').setView([39.75621 , -104.99404], 13);

// Load the tiled layer
L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=sk.eyJ1Ijoia2t5eWhoOTYiLCJhIjoiY2pzM3J0aWR3MmltYTQ5cXJleHliZDUzdyJ9.4enHtAI7j_760lP8xPqc8Q', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1Ijoia2t5eWhoOTYiLCJhIjoiY2pzM3J0aWR3MmltYTQ5cXJleHliZDUzdyJ9.4enHtAI7j_760lP8xPqc8Q',
}).addTo(mymap);

// Add markers
var marker = L.marker([51.5, -0.09]).addTo(mymap);

// Add circles
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

// Add polygons
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);

// Add popups for features
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

// Add popups for layer
var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

// Add events
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

// Map 2
// Load the tiled layer
L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=sk.eyJ1Ijoia2t5eWhoOTYiLCJhIjoiY2pzM3J0aWR3MmltYTQ5cXJleHliZDUzdyJ9.4enHtAI7j_760lP8xPqc8Q', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1Ijoia2t5eWhoOTYiLCJhIjoiY2pzM3J0aWR3MmltYTQ5cXJleHliZDUzdyJ9.4enHtAI7j_760lP8xPqc8Q',
}).addTo(mymap2);

// Define geojson features
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

// Add the geojson features to the map layer
L.geoJSON(geojsonFeature).addTo(mymap2);

// Define line features
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

// Define the style of the lines
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

// Add to the layer
L.geoJSON(myLines, {
    style: myStyle
}).addTo(mymap2);

// Define polygon features including styles
var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];

// Add to layer
L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(mymap2);

// Define function for each feature
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(mymap2);

// Add some other features
var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true, // show on the map
        'popupContent':'Coors Field'
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104, 38]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": true, 
        //"show_on_map": false, // not show on the map
        'popupContent':'Busch Field'
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-105, 39]
    }
}];


// To control which feature will show on the map
someFeatureLayer = L.geoJSON(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    },
    //onEachFeature: onEachFeature
})
//.bindPopup("a")
.addTo(mymap2);

someFeatureLayer.bindPopup(someFeatures[0].properties.popupContent);
someFeatureLayer.bindPopup(someFeatures[1].properties.popupContent);