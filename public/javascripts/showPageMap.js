

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 9,
    center: campground.geometry.coordinates,
})

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25, closeOnClick: true})
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</P>`
            )
    )
    .addTo(map)