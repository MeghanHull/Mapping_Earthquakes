// RICE-VIRT-DATA-PT-05-2022-U-B-MW Module 13
// ----------------------------------------------------------------------------------------------------------
// Purpose  : Map multi-part line
// Created  : 2022 Aug 01 20:22:32 UTC (Meghan E. Hull)
// Modified : 2022 Aug 06 17:40:00 UTC (Meghan E. Hull)
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
    // Center between LAX and SFO
    location: [36.1733, -120.1794],
    zoomLevel: 7,
  },
  {
    //Center at the San Francisco airport (SFO)
    location: [37.6213, -122.3790],
    zoomLevel: 5,
  }
];
let defaultMapView = 3;
console.log(mapCenter[defaultMapView])

// Factor to scale marker radii
scaleMarkerRadii = 200000;

// Call an array containing each city's location, state, and population.
let cityData = cities;

// Coordinates for each point to be used in the polyline.
let line = [
  [33.9416, -118.4085],
  [37.6213, -122.3790],
  [40.7899, -111.9791],
  [47.4502, -122.3088]
];

// ----------------------------------------------------------------------------------------------------------
// Body
// ----------------------------------------------------------------------------------------------------------
// Create the map object with a center and zoom level
let map = L.map('mapid').setView(mapCenter[defaultMapView].location, mapCenter[defaultMapView].zoomLevel);

// // Loop through each city
// cityData.forEach(function(city) {
//     // QA log for loop
//     console.log(city);
//     // Add a marker for the city
//     L.circleMarker(city.location, {
//         radius: city.population/scaleMarkerRadii,
//         color: 'orange',
//         weight: 4
//     })
//       .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//       .addTo(map);
// });

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "yellow"
}).addTo(map);

// Create tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/dark-v10',
    id: 'mapbox/streets-v11',
    // id: 'satellite-streets-v11',
    accessToken: API_key
});

// Add 'graymap' tile layer to the map.
streets.addTo(map);