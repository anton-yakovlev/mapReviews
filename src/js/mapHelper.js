// ----- Yandex Map API methods ----- //
const MAP_ID = 'generalMap';
let mapObject;

/* global ymaps */
class MapHelper {
    createMap() {
        mapObject = new ymaps.Map(MAP_ID, {
            center: [55.76, 37.64],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        });
    }

    getAddress(coords) {
        return ymaps.geocode(coords).then(function (res) {
            const firstGeoObject = res.geoObjects.get(0);

            return firstGeoObject.getAddressLine();
        });
    }

    clickHandeler(e) {
        const coords = e.get('coords');

        console.log(this.getAddress(coords));
    }

    listeners() {
        mapObject.events.add('click', (e) => this.clickHandeler(e));
    }
}

module.exports = new MapHelper;