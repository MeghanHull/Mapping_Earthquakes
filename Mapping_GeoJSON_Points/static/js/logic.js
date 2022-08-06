// RICE-VIRT-DATA-PT-05-2022-U-B-MW Module 13
// ----------------------------------------------------------------------------------------------------------
// Purpose  : Map with multiple GeoJSON locations
// Created  : 2022 Aug 01 20:22:32 UTC (Meghan E. Hull)
// Modified : 2022 Aug 06 20:37:40 UTC (Meghan E. Hull)
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
  }
];
let defaultMapView = 3;
console.log(mapCenter[defaultMapView])

// Accessing the airport GeoJSON URL
let airportDataURL = "https://raw.githubusercontent.com/MeghanHull/Mapping_Earthquakes/main/data/majorAirports.json";
console.log(airportDataURL);

// ----------------------------------------------------------------------------------------------------------
// Body
// ----------------------------------------------------------------------------------------------------------
// Create the map object with a center and zoom level
let map = L.map('mapid').setView(mapCenter[defaultMapView].location, mapCenter[defaultMapView].zoomLevel);

// Grabbing our GeoJSON data.
d3.json(airportDataURL).then(function(data) {
  console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
      onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h3>Airport code: " + feature.properties.faa + "</h3><hr><p>Airport name: " + feature.properties.name + "</p>");
      }
    }).addTo(map);
});

// Create tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    // id: 'mapbox/navigation-day-v1',
    // id: 'mapbox/navigation-night-v1',
    // id: 'mapbox/dark-v10',
    // id: 'mapbox/light-v10',
    // id: 'mapbox/streets-v11',
    // id: 'mapbox/satellite-streets-v11'
    accessToken: API_key
});

// Add 'graymap' tile layer to the map.
streets.addTo(map);