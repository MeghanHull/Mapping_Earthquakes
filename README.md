# Mapping Earthquakes
<!-- Interactive Earthquake Map from GeoJSON, using JavaScript, D3 & Leaflet libraries, and Mapbox API (Rice Bootcamp) -->
## Project Background
Disaster Reporting Network requests an interactive map of earthquakes, using the earthquake GeoJSONs from USGS, with the following requirements:
- Illustrate magnitude and location of earthquakes with popup markers
  - Magnitude denoted with increased marker diameter and darker color
  - Legend included on map
- Include fault lines on map

## Purpose
The purpose of this project is to visually show the differences between the magnitudes of earthquakes all over the world for the last seven days.

## Reources
### Data Sources
1. [USGS Earthquake Real-Time GeoJSON for the last 7 days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
2. [Tectonic Plate Boundaries GeoJSON](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)
3. [USGS Earthquake Real-Time GeoJSON for the last 7 days with M+4.5](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson)

### Software & CDNs
<!-- Leaflet is a content delivery network -->
***Table 1: Software & Library Versions***
| Software | Version |
| :--- | :---: |
| JavaScript | ES6+ |
| BootStrap CDN | 4.0.0 |
| D3 CDN | 5.16.0 |
| Leaflet CDN | 1.8.0 |
| Visual Studio Code | 1.69.2 |

# Project Summary
## Final Map
The completed map and assosiated files are available in the ***main*** branch folder [Earthquake_Challenge](Earthquake_Challenge/):
1. [index.html](Earthquake_Challenge/index.html)
2. [challenge_logic.js](Earthquake_Challenge/static/js/challenge_logic.js)
3. [style.css](Earthquake_Challenge/static/css/style.css)

## Methodology
The JavaScript and the D3.js libraries were used to retrieve the GeoJSON data via their URLs.  Coordinates and magnitudes of the earthquakes were pulled from the two USGS real-time GeoJSON links; tectonic plate boundaries were retrieved from a public github provided.  The Leaflet library was then used to plot the data on a Mapbox map through an API request and create interactivity for the earthquake data.

The map was built in stages, with each building block of the final map tested on individual branches: 
1. Simple_Leaflet_Map
2. Mapping_Single_Points
3. Mapping_Lines
4. Mapping_GeoJSON_Points
5. Mapping_GeoJSON_Linestrings
6. Mapping_GeoJSON_Polygons
7. Earthquakes_past7days
