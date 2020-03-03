'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map2.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiZHd3YXdlcnUiLCJhIjoiY2s2dnJkdTd0MDBiZzNsbzh0cGIybGZmbSJ9.escl27EkMHCYKwLThisFkw'

// adding base map layer
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-86.2520, 41.6764], //South Bend, IN
    zoom: 12.5
});

var overlay = document.getElementById('map-overlay');
 
// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
closeButton: false
});

// creating landplot owner, industry, and modern public parcel layer variables
//var landplots_url = "./data/landplots.json"
//var oldindust_url = "./data/industry.json"
var modpub_url = "./data/modern_pub.geojson"

// Modern-day Public Properties Layer

     // define a 'source' for modern day public property dataset
     map.addSource('modern_pub',{
        'type':'geojson',
        'data': modpub_url,
      });
      // add a new layer with old industry
      map.addLayer({
        'id':'modern_pub',
        'type':'fill',
        'source':'modern_pub',
        'paint':{
          'fill-color':'#fcba03',
          'fill-outline-color' : '#fcba03'
        }
    },
    'settlement-label'
     );
