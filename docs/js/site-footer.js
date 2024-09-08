let dataUrl = 'https://ollzre6syz35uyr4cradzsotqy0oaxum.lambda-url.us-west-1.on.aws/';

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log(jsonData);
        
        return jsonData;
    } catch (error) {
        console.error(error.message);
    }
}

let map = L.map('map').on('load', onMapLoad).setView([38.4665023,132.6055246], 6);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
   attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
   subdomains: 'abcd',
   maxZoom: 19,
   minZoom: 0
 }).addTo(map);

 function onMapLoad() {
    Promise.all([getData(dataUrl)])
    .then(results => {
        let data = results[0];

        createMarkers(data);
        console.log(data);
    })
    .catch(err => console.error(err));
}

function createMarkers(data) {
    data.forEach(destination => {
        let marker = L.marker([destination.lat, destination.lon]).bindPopup(createPopup(destination)).addTo(map);
    });
}

function createPopup(destination) {
    let popup = L.popup();
    let popupContent = `
        <h2>${destination['Place']}</h2>
        <p>Who's Interested: ${destination['Who']}</p>
        <p>Interest Level: ${destination['Interest Level']}</p>
        <p><a href="${destination['Google Maps URL']}">More Info</a></p>
        <p>${destination['Notes']}</p>
    `;

    popup.setContent(popupContent);

    return popup;
}