// ----- Yandex Map API methods ----- //
const MAP_ID = 'generalMap';
const viewHelper = require('./viewHelper');
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

    clickHandeler(e) {
        const coords = e.get('coords');

        this.getAddress(coords)
            .then(res => res.geoObjects.get(0).getAddressLine())
            .then((address) => {
                viewHelper.renderReviewForm({address: address});
                //console.log(address);
            });
    }

    listeners() {
        mapObject.events.add('click', (e) => this.clickHandeler(e));
    }
}

module.exports = new MapHelper;