// ----- Yandex Map API methods ----- //
const MAP_ID = 'generalMap';
const viewHelper = require('./viewHelper');
const storageHelper = require('./storageHelper');
const sliderHelper = require('./sliderHelper');
const CLUSTERER_GRID_SIZE = 100;
const DEFAULT_ZOOM = 15;
const START_COORDINATES = [55.76, 37.64];
let mapObject;
let clusterer;

/* global ymaps */
class MapHelper {
    createMap() {
        mapObject = new ymaps.Map(MAP_ID, {
            center: START_COORDINATES,
            zoom: DEFAULT_ZOOM
        }, {
            searchControlProvider: 'yandex#search'
        });

        clusterer = new ymaps.Clusterer({
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false,
            clusterOpenBalloonOnClick: false,
            gridSize: CLUSTERER_GRID_SIZE
        });

        mapObject.cursors.push('arrow');
    }

    getAddress(coords) {
        return ymaps.geocode(coords);
    }

    generatePlacemark(review) {
        let properties = {
            address: review.address,
            coords: review.coords
        };

        return new ymaps.Placemark(review.coords.split(','), properties, {});
    }

    removePlacemarks() {
        storageHelper.removeLocalStorage();
        clusterer.removeAll();
    }

    setPlacemarks(reviews) {
        let placemarks = [];

        reviews.forEach(item => placemarks.push(this.generatePlacemark(item)));
        clusterer.add(placemarks);
        mapObject.geoObjects.add(clusterer);
    }

    updateMap() {
        let reviews = storageHelper.getLocalStorageAll();
        let placemarkCoords = [];

        for (let key in reviews) {
            if (reviews.hasOwnProperty(key)) {
                let currentCoords = [];

                reviews[key].forEach((item) => {
                    let review = {
                        address: key,
                        coords: item.coords
                    };

                    currentCoords.push(review);
                });

                placemarkCoords = placemarkCoords.concat(currentCoords);
            }
        }

        this.setPlacemarks(placemarkCoords);
    }

    getGeoObjectAddresses(target) {
        let result = [];

        try {
            let geoObjects = target.getGeoObjects();

            geoObjects.forEach((geoObject) => {
                let address = geoObject.properties.get('address');

                if (result.indexOf(address) < 0) {
                    result.push(address);
                }
            });
        } catch (e) {
            result = [];
        }

        return result;
    }

    getReviewsByAddresses(addreses) {
        let reviews = [];

        addreses.forEach((address) => {
            let addressReviews = storageHelper.getLocalStorage(address);

            addressReviews.forEach(item => item.address = address);
            reviews = reviews.concat(addressReviews);
        });

        return reviews;
    }

    clickHandler(e) {
        e.stopPropagation();
        const coords = e.get('coords');
        const target = e.get('target');
        const geoObjectsAddresses = this.getGeoObjectAddresses(target);

        this.getAddress(coords)
            .then(res => res.geoObjects.get(0).getAddressLine())
            .then((address) => {
                let reviews = storageHelper.getLocalStorage(address);
                let isManyGeoObjects = geoObjectsAddresses.length > 0;

                if (isManyGeoObjects) {
                    let geoObjects = this.getReviewsByAddresses(geoObjectsAddresses);

                    viewHelper.renderReviewsSlider({
                        reviews: geoObjects
                    });

                    sliderHelper.init();
                } else {
                    viewHelper.renderReviewForm({
                        address: address,
                        coords: coords,
                        reviews: reviews
                    });
                }
            });
    }

    listeners() {
        mapObject.events.add('click', (e) => this.clickHandler(e));
        clusterer.events.add('click', (e) => this.clickHandler(e));
    }
}

module.exports = new MapHelper;