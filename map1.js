var mymap = L.map('map').setView([30.315629275028765, -97.75196063291139], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

// Function to add a colored marker
function addColoredMarker(coordinates, color) {
    var marker = L.circleMarker(coordinates, {
        radius: 4,
        fillColor: color,
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    });
    marker.addTo(mymap);
}



// Load all positions from the GeoJSON file
fetch('positions.geojson')
    .then(response => response.json())
    .then(positionsData => {
        // Load the delivered properties
        fetch('selected_data.json')
            .then(response => response.json())
            .then(deliveredData => {
                // Extract ProjID of delivered properties
                const deliveredProjIDs = deliveredData.map(item => item.ProjID);

                // Add markers for all properties
                positionsData.features.forEach(feature => {
                    const coordinates = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
                    const isDelivered = deliveredProjIDs.includes(feature.properties.ProjID);

                    // Choose color based on delivery status
                    const color = isDelivered ? 'blue' : 'red';

                    // Add the marker to the map
                    addColoredMarker(coordinates, color);
                });
            });
    });

    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'legend'),
            labels = ['Delivered', 'Not Delivered'],
            colors = ['blue', 'red'];

        for (var i = 0; i < labels.length; i++) {
            div.innerHTML += 
                '<i style="background:' + colors[i] + '; border-radius: 50%; width: 10px; height: 10px; display: inline-block;"></i> ' +
                labels[i] + '<br>';
        }

        return div;
    };

    legend.addTo(mymap);
