// RICE-VIRT-DATA-PT-05-2022-U-B-MW Module 13
// ----------------------------------------------------------------------------------------------------------
// Purpose  : Map with all recorded earthquakes from the past seven days (Step 5)
// Created  : 2022 Aug 07 04:44:29 UTC (Meghan E. Hull)
// Modified : 2022 Aug 07 04:57:41 UTC (Meghan E. Hull)
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

// Style constants
const magnitudes = [0, 1, 2, 3, 4, 5];
const colors = [
  "#98ee00",
  "#d4ee00",
  "#eecc00",
  "#ee9c00",
  "#ea822c",
  "#ea2c2c"
];
// ----------------------------------------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------------------------------------
function styleInfo(feature) {
// Purpose: Set style for markers
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
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
function getColor(magnitude) {
// Purpose: Returns color for the earthquake marker based on its magnitude
  if (magnitude > 5) {
    return colors[5];
  }
  if (magnitude > 4) {
    return colors[4];
  }
  if (magnitude > 3) {
    return colors[3];
  }
  if (magnitude > 2) {
    return colors[2];
  }
  if (magnitude > 1) {
    return colors[1];
  }
  return colors[0];
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
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_key
});
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    accessToken: API_key
});
// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// Create a base layer that holds both background maps
let baseMaps = {
  "Street": streets,
  "Satellite": satelliteStreets
};

// Create overlay that holds all overlays
let overlays = {
  Earthquakes: earthquakes
};

// Create the map object with a center and zoom level
let map = L.map('mapid', {
  center: mapCenter[defaultMapView].location, 
  zoom: mapCenter[defaultMapView].zoomLevel,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// ----------------------------------------------------------------------------------------------------------
// Earthquake Data
// ----------------------------------------------------------------------------------------------------------
// Grabbing our GeoJSON data.
d3.json(earthquakeDataURL).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    // Add circle markers
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set style
    style: styleInfo,
    // Add popups
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    },
  }).addTo(earthquakes);
  earthquakes.addTo(map);
});  

// ----------------------------------------------------------------------------------------------------------
// Add Legend
// ----------------------------------------------------------------------------------------------------------
// Create a legend control object
var legend = L.control({position: 'bottomright'});

// Add details for the legend
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  
  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < magnitudes.length; i++) {
    div.innerHTML +=
    '<i style="background:' + colors[i] + '"></i> ' + 
    magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
  }
  return div;
};
// Add legend
legend.addTo(map);