// ----- Yandex Map API methods ----- //
const MAP_ID = 'generalMap';

/* global ymaps */
class MapHelper {
    createMap() {
        return new ymaps.Map(MAP_ID, {
            center: [55.76, 37.64],
            zoom: 5
        }, {
            searchControlProvider: 'yandex#search'
        });
    }
}

module.exports = new MapHelper;