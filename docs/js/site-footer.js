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
        let data = results[0].data;

        createMarkers(data);
        console.log(data);
    })
    .catch(err => console.error(err));
}

function createMarkers(data) {
    data.forEach(destination => {
        let marker = L.marker([destination.lat, destination.lon]).addTo(map);
    });
}


// fetch('./data/categories.json')
// .then((response) => response.json())
// .then((json) => {
//     json.forEach(category => {
//         let path = './data/' + category

//         fetch(path)
//         .then((response2) => response2.json())
//         .then((json2) => {
//             json2.forEach(shop => {
//                 let marker = L.marker([shop.location.lat, shop.location.lon]).addTo(map);
                
//                 let newElemName = document.createElement('h2');
//                 newElemName.textContent = shop.name;

//                 let newElemDesc = document.createElement('span');
//                 newElemDesc.textContent = shop.description;
                
//                 let newElem = document.createElement('div');
//                 newElem.appendChild(newElemName);
//                 newElem.appendChild(newElemDesc);
                
//                 let list = document.querySelector('#list div');
//                 list.appendChild(newElem);
//             });
            
//         });
//     });
// });