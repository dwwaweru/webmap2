'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

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
map.on('load',function() {
     // define a 'source' for modern day public property dataset
     map.addSource('modern_pub',{
        'type':'geojson',
        'data': modpub_url,
      });
      // Add base layer of modern public parcels
    map.addLayer(
        {
        'id':'modern_pub',
        'type':'fill',
        'source':'modern_pub',
        'paint':{
          'fill-color':'#EEE1B2',
          'fill-outline-color' : '#EEE1B2',
          'fill-opacity' : 1
        },
    }, 
    );
    // Add highlighted layer of modern public parcels
    map.addLayer(
        {
        'id':'modern_pub-highlighted',
        'type':'fill',
        'source':'modern_pub',
        'paint':{
          'fill-color':'#6142D0',
          'fill-outline-color' : '#38296F',
          'fill-opacity': 0.5
        },
          'filter': ['in', 'simp_name', '']
        },
       ); 

       map.on('mousemove', 'modern_pub', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Single out the first found feature.
        var feature = e.features[0];

        // Query the modern parcels layer visible in the map. Use the filter
        // param to only collect results that share the same name.
        var relatedFeatures = map.querySourceFeatures('modern_pub', {
            sourceLayer: 'modern_pub',
            filter: ['in', 'simp_name', feature.properties.simp_name]
        });

        // Render found features in an overlay.
        overlay.innerHTML = '';

        var title = document.createElement('strong');
            title.textContent =
                feature.properties.simp_name +
                ' (' +
                relatedFeatures.length +
                ' found)';
        
        overlay.appendChild(title);
        overlay.style.display = 'block';

        // Add features that share the same name to the highlighted layer.
        map.setFilter('modern_pub-highlighted', [
            'in',
            'simp_name',
            feature.properties.simp_name
        ]);

        // Display a popup with the name of the feature
        popup
        .setLngLat(e.lngLat)
        .setText(feature.properties.name)
        .addTo(map);
    });

    map.on('mouseleave', 'simp_name', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
        map.setFilter('modern_pub-highlighted', ['in', 'simp_name', '']);
        overlay.style.display = 'none';
    });

});