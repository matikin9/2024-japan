let map = L.map('map').setView([34.0522, -118.2437], 11);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
   attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
   subdomains: 'abcd',
   maxZoom: 19,
   minZoom: 0
 }).addTo(map);


fetch('./data/categories.json')
.then((response) => response.json())
.then((json) => {
    json.forEach(category => {
        let path = './data/' + category

        fetch(path)
        .then((response2) => response2.json())
        .then((json2) => {
            json2.forEach(shop => {
                let marker = L.marker([shop.location.lat, shop.location.lon]).addTo(map);
                
                let newElemName = document.createElement('h2');
                newElemName.textContent = shop.name;

                let newElemDesc = document.createElement('span');
                newElemDesc.textContent = shop.description;
                
                let newElem = document.createElement('div');
                newElem.appendChild(newElemName);
                newElem.appendChild(newElemDesc);
                
                let list = document.querySelector('#list div');
                list.appendChild(newElem);
            });
            
        });
    });
});