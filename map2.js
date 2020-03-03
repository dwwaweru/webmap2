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