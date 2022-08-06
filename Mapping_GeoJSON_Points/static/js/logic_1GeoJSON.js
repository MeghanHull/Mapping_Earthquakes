// RICE-VIRT-DATA-PT-05-2022-U-B-MW Module 13
// ----------------------------------------------------------------------------------------------------------
// Purpose  : Map with single GeoJSON
// Created  : 2022 Aug 01 20:22:32 UTC (Meghan E. Hull)
// Modified : 2022 Aug 06 20:09:09 UTC (Meghan E. Hull)
// ----------------------------------------------------------------------------------------------------------
// Add console.log to check to see if our code is working.
console.log("logic.js loaded");

// ----------------------------------------------------------------------------------------------------------
// Input
// ----------------------------------------------------------------------------------------------------------
// Geographic Center for United States, per US NGS
let mapCenter = [{
    // Geographic center w/Alaska & Hawaii
    location: [39.8283, -98.5795],
    zoomLevel: 3,
  },
  {
    // Geographic center of contiguous United States
    location: [39.8333333, -98.585522],
    zoomLevel: 5,

  }, 
  {
    // Center at the San Francisco airport (SFO)
    location: [37.6213, -122.3790],
    zoomLevel: 11,
  }
];
let defaultMapView = 2;
console.log(mapCenter[defaultMapView])

// Factor to scale marker radii
scaleMarkerRadii = 200000;

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};
console.log(sanFranAirport);

// ----------------------------------------------------------------------------------------------------------
// Body
// ----------------------------------------------------------------------------------------------------------
// Create the map object with a center and zoom level
let map = L.map('mapid').setView(mapCenter[defaultMapView].location, mapCenter[defaultMapView].zoomLevel);

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
  // Add labels
  // Option 1 - Callback Function 'pointToLayer' (adds basic markers to a map)
  // pointToLayer: function(feature, latlng) {
  //   console.log(feature);
  //   return L.marker(latlng)
  //     .bindPopup("<h3>" + feature.properties.name + "</h3><hr><p>" + feature.properties.city + ", " + feature.properties.country) + "</p>";
  // }
  // Option 2 - Callback Function 'onEachFeature' (allows add styling / binding to popup marker)
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h3>Airport code: " + feature.properties.faa + "</h3><hr><p>Airport name: " + feature.properties.name + "</p>");
  }
}).addTo(map);


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