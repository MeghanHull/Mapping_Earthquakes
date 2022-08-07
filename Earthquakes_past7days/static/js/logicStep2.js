// RICE-VIRT-DATA-PT-05-2022-U-B-MW Module 13
// ----------------------------------------------------------------------------------------------------------
// Purpose  : Map with all recorded earthquakes from the past seven days (Step 2)
// Created  : 2022 Aug 07 03:38:27 UTC (Meghan E. Hull)
// Modified : 2022 Aug 07 03:57:58 UTC (Meghan E. Hull)
// ----------------------------------------------------------------------------------------------------------
// Add console.log to check to see if our code is working.
console.log("logic.js loaded");

// ----------------------------------------------------------------------------------------------------------
// Input
// ----------------------------------------------------------------------------------------------------------
// Map Centers
let mapCenter = [{
    // Geographic center of USA w/Alaska & Hawaii, per US NGS
    location: [39.8283, -98.5795],
    zoomLevel: 3,
  },
  {
    // Geographic center of contiguous United States, per US NGS
    location: [39.8333333, -98.585522],
    zoomLevel: 3,

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

let defaultMapView = 1;
console.log(mapCenter[defaultMapView])

// Accessing the USGS Earthquake Real-Time GeoJSON URL for the last 7 days
let earthquakeDataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(earthquakeDataURL);

// ----------------------------------------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------------------------------------
function styleInfo(feature) {
// Purpose: Set style for markers
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}
// ----------------------------------------------------------------------------------------------------------
function getRadius(magnitude) {
// Purpose: Determines the radius of the earthquake marker based on its magnitude
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}
// ----------------------------------------------------------------------------------------------------------
// Map Styles & Layers
// ----------------------------------------------------------------------------------------------------------
// Create tile layer that will be the background of our map.
    // id: 'mapbox/outdoors-v11',
    // id: 'mapbox/navigation-day-v1',
    // id: 'mapbox/navigation-night-v1',
    // id: 'mapbox/streets-v11',
    // id: 'mapbox/dark-v10',
    // id: 'mapbox/light-v10',
    // id: 'mapbox/satellite-streets-v11'
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_key
});
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    accessToken: API_key
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Street": streets,
  "Satellite": satelliteStreets
};

// Create the map object with a center and zoom level
let map = L.map('mapid', {
  center: mapCenter[defaultMapView].location, 
  zoom: mapCenter[defaultMapView].zoomLevel,
  layers: [streets]
});

// ----------------------------------------------------------------------------------------------------------
// Earthquake Data
// ----------------------------------------------------------------------------------------------------------
// Grabbing our GeoJSON data.
d3.json(earthquakeDataURL).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng)
      .bindPopup("<h3>" + feature.properties.title + "</h3>");
    },
    style: styleInfo
  }).addTo(map);
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);  