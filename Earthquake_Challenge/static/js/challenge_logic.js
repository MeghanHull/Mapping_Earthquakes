// RICE-VIRT-DATA-PT-05-2022-U-B-MW Module 13 Challenge
// ----------------------------------------------------------------------------------------------------------
// Purpose  : Map with all recorded earthquakes from the past seven days
// Created  : 2022 Aug 07 05:23:27 UTC (Meghan E. Hull)
// Modified : 2022 Aug 10 04:45:15 UTC (Meghan E. Hull)
// ----------------------------------------------------------------------------------------------------------
// Add console.log to check to see if our code is working.
console.log("logic.js loaded");

// ----------------------------------------------------------------------------------------------------------
// Input URLs
// ----------------------------------------------------------------------------------------------------------
console.log("Input URLs")
// 1.  USGS Earthquake Real-Time GeoJSON URL for the last 7 days
let earthquakeDataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(earthquakeDataURL);
// 2. Tectonic Plate Boundaries GeoJSON URL
let tectonicPlateDataURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
console.log(tectonicPlateDataURL)
// 3.  USGS Earthquake Real-Time GeoJSON URL for the last 7 days with M+4.5
let majorEarthquakeDataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
console.log(majorEarthquakeDataURL);


// ----------------------------------------------------------------------------------------------------------
// Map Constants
// ----------------------------------------------------------------------------------------------------------
// Map Centers
let mapCenter = [{
    // 0. Geographic center of USA w/Alaska & Hawaii, per US NGS
    location: [39.8283, -98.5795],
    zoomLevel: 3,
  },
  {
    // 1. Geographic center of contiguous United States, per US NGS
    location: [39.8333333, -98.585522],
    zoomLevel: 3,

  }, 
  {
    // 2. Geographic center of Earth land masses (Isenberg, 2003)
    location: [40.866667, 34.566667],
    zoomLevel: 2,
  }, 
  {
    // 3. Geographic center of Earth land masses (Smyth, 1864)
    location: [30, 31],
    zoomLevel: 2,
  }, 
  {
    // 4. Center from tectonic_plate_starter_logic.js
    location: [40.7, -94.5],
    zoomLevel: 3,
  }
];

let defaultMapView = 4;
console.log("Default Map View")
console.log(mapCenter[defaultMapView])

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
const lineColor = '#703606';
// ----------------------------------------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------------------------------------
function styleInfo(feature, urlNo) {
// Purpose: Set style for markers
console.log("Loading styleInfo(" + feature.properties.name + ", " + urlNo + ")")
  // Markers
  if (urlNo == 1 || urlNo==3 ) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag, urlNo),
      color: "#000000",
      radius: getRadius(feature.properties.mag, urlNo),
      stroke: true,
      weight: 0.5
    };
  };
  // Boundary lines
  if (urlNo==2) {
    return {
      color: lineColor, 
      weight: 3
    };
  };
}
// ----------------------------------------------------------------------------------------------------------
function getRadius(magnitude, urlNo) {
// Purpose: Determines the radius of the earthquake marker based on its magnitude
  console.log("Loading getRadius(" + magnitude + ", " + urlNo + ")")
  // Earthquake marker
  if (urlNo == 1 || urlNo == 3) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
}
// ----------------------------------------------------------------------------------------------------------
function getColor(magnitude, urlNo) {
// Purpose: Returns color for the earthquake marker based on its magnitude
  // Earthquake marker
  if (urlNo == 1) {
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
  };
  if (urlNo == 3) {
    if (magnitude > 6) {
      return colors[5];
    }
    if (magnitude >= 5) {
      return colors[5];
    }
    if (magnitude < 5) {
      return colors[4];
    }
    return colors[0];
  };
}
// ----------------------------------------------------------------------------------------------------------
// Map Layers
// ----------------------------------------------------------------------------------------------------------
// Create tile layers that will be the background of our map.
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

// Create the earthquake overlay layers for our map
let allEarthquakes = new L.layerGroup();
let tectonicPlates = new L.LayerGroup();
let majorEarthquakes = new L.layerGroup();

// Create a base layer that holds both background maps
let baseMaps = {
  "Street": streets,
  "Satellite": satelliteStreets
};

// Create overlay that holds all overlays
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonic Plates": tectonicPlates,
  "Major Earthquakes": majorEarthquakes
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
  // console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    // Add circle markers
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, styleInfo(feature, 1));
    },
    // // Set style
    // style: function(feature) {styleInfo(feature, 1)},
    // Add popups
    onEachFeature: function(feature, layer) {
      // console.log(layer);
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    },
  }).addTo(allEarthquakes);
  allEarthquakes.addTo(map);
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

// ----------------------------------------------------------------------------------------------------------
// Tectonic Plate Data
// ----------------------------------------------------------------------------------------------------------
// Grabbing our GeoJSON data.
d3.json(tectonicPlateDataURL).then((data) => {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
      style: {color: "#703606", weight: 3},
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>Plate Boundary: " + feature.properties.Name + "</h3>");
      }
    }).addTo(tectonicPlates);
    // Add the tectonic layer group to the map.
    tectonicPlates.addTo(map); 
});
// ----------------------------------------------------------------------------------------------------------
// Major Earthquake Data
// ----------------------------------------------------------------------------------------------------------
// Grabbing our GeoJSON data.
d3.json(majorEarthquakeDataURL).then(function(data) {
  // console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    // Add circle markers
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, styleInfo(feature, 3));
    },
    // Add popups
    onEachFeature: function(feature, layer) {
      // console.log(layer);
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    },
  }).addTo(majorEarthquakes);
  majorEarthquakes.addTo(map);
}); 