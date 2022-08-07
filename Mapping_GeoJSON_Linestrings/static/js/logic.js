// RICE-VIRT-DATA-PT-05-2022-U-B-MW Module 13
// ----------------------------------------------------------------------------------------------------------
// Purpose  : Map with multiple GeoJSON lines (Skills Drill)
// Created  : 2022 Aug 01 20:22:32 UTC (Meghan E. Hull)
// Modified : 2022 Aug 07 02:32:20 UTC (Meghan E. Hull)
// ----------------------------------------------------------------------------------------------------------
// Add console.log to check to see if our code is working.
console.log("logic.js loaded");

// ----------------------------------------------------------------------------------------------------------
// Input
// ----------------------------------------------------------------------------------------------------------
// Map Centers
let mapCenter = [{
    // Geographic center w/Alaska & Hawaii, per US NGS
    location: [39.8283, -98.5795],
    zoomLevel: 3,
  },
  {
    // Geographic center of contiguous United States, per US NGS
    location: [39.8333333, -98.585522],
    zoomLevel: 5,

  }, 
  {
    // Geographic center of Earth land masses (Isenberg, 2003)
    location: [40.866667, 34.566667],
    zoomLevel: 2,
  }, 
  {
    // Geographic center of Earth land masses (Smyth, 1864)
    location: [30, 31],
    zoomLevel: 2,
  }, 
  {
    // Toronto Pearson International Airport
    location: [43.676667, -79.630556],
    zoomLevel: 2,
  }
];

let defaultMapView = 4;
console.log(mapCenter[defaultMapView])

// Accessing the Toronto airline routes GeoJSON URL.
let torontoDataURL = "https://raw.githubusercontent.com/MeghanHull/Mapping_Earthquakes/main/data/torontoRoutes.json";
console.log(torontoDataURL);

// ----------------------------------------------------------------------------------------------------------
// Body
// ----------------------------------------------------------------------------------------------------------
// Create tile layer that will be the background of our map.
    // id: 'mapbox/outdoors-v11',
    // id: 'mapbox/navigation-day-v1',
    // id: 'mapbox/navigation-night-v1',
    // id: 'mapbox/streets-v11',
    // id: 'mapbox/dark-v10',
    // id: 'mapbox/light-v10',
    // id: 'mapbox/satellite-streets-v11'
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/navigation-day-v1',
    accessToken: API_key
});
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/navigation-night-v1',
    accessToken: API_key
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Day Navigation": light,
  "Night Navigation": dark
};

// Create the map object with a center and zoom level
let map = L.map('mapid', {
  center: mapCenter[defaultMapView].location, 
  zoom: mapCenter[defaultMapView].zoomLevel,
  layers: [dark]
});

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoDataURL).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3><hr><p>Destination: " + feature.properties.dst + "</p>");
    }
  }).addTo(map);
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);  