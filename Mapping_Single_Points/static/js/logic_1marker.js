// RICE-VIRT-DATA-PT-05-2022-U-B-MW Module 13
// ----------------------------------------------------------------------------------------------------------
// Purpose  : Test with a single map marker
// Created  : 2022 Aug 01 20:22:32 UTC (Meghan E. Hull)
// Modified : 2022 Aug 01 20:41:05 UTC (Meghan E. Hull)
// ----------------------------------------------------------------------------------------------------------

// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

//  Add a marker to the map for Los Angeles, California.
// Option 1 - Regular Marker
//let marker = L.marker([34.0522, -118.2437]).addTo(map);
// Option 2 - Circle w/ radius specified in meters
// L.circle([34.0522, -118.2437], {
//     color: 'black',
//     fillColor: '#ffff00',
//     fillOpacity: 0.25,
//     radius: 100
//  }).addTo(map);
// Option 3 - Circle w/ radius in pixels
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: 'black',
    fillColor: '#ffffa1'
}).addTo(map);


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    // id: 'mapbox/streets-v11',
    accessToken: API_key
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);