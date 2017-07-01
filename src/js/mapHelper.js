// ----- Yandex Map API methods ----- //
const MAP_ID = 'generalMap';
const viewHelper = require('./viewHelper');
const storageHelper = require('./storageHelper');
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
        return ymaps.geocode(coords);
    }

    setPlacemark(coords) {
        if (!coords) {
            return;
        }

        let placemark = new ymaps.Placemark(coords.split(','), {});

        console.log(coords.split(','), placemark, mapObject);

        mapObject.geoObjects.add(placemark);
    }

    clickHandeler(e) {
        const coords = e.get('coords');

        this.getAddress(coords)
            .then(res => res.geoObjects.get(0).getAddressLine())
            .then((address) => {
                viewHelper.renderReviewForm({
                    address: address,
                    coords: coords,
                    reviews: storageHelper.getLocalStorage(address)
                });
            });
    }

    listeners() {
        mapObject.events.add('click', (e) => this.clickHandeler(e));
    }
}

module.exports = new MapHelper;