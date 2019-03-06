var map = L.map('mapid6').setView([37.8, -96], 3);

function getUSData(map){
    //load the data
    $.ajax("data/us-states.geojson", {
        dataType: "json",
        success: function(response){
            data = response;
            L.geoJson(data, {
            }).addTo(map);
        }
    });
};

$(document).ready(getUSData(map));