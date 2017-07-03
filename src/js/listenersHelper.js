// ----- Event listeners ----- //
const viewHelper = require('./viewHelper');
const storageHelper = require('./storageHelper');
const mapHelper = require('./mapHelper');
const sliderHelper = require('./sliderHelper');
const CLOSE_DILAOG_ID = 'closeDialog';
const RELOAD_AFTER_ERROR_ID = 'reloadAfterError';
const REVIEW_FORM_ID = 'reviewForm';
const CONTROLS_REMOVE_PLACEMARKS_ID = 'removePlacemarks';
const SLIDER_LEGEND_LINK_CLASS_NAME = 'slider__footer-list-item-link';
const SLIDER_ITEM_LINK_CLASS_NAME = 'slider__list-item-link';
const SLIDER_ARROW_LINK_CLASS_NAME = 'slider__controls-item';

class Listeners {
    clickHandler(e) {
        let target = e.target;

        // ----- Click listener for reload button after error ----- //
        if (target.id === RELOAD_AFTER_ERROR_ID) {
            location.reload();
        }

        // ----- Click listener for close button on dialog ----- //
        if (target.id === CLOSE_DILAOG_ID) {
            viewHelper.closeDialog();
        }

        // ----- Click listener for remove placemarks button ----- //
        if (target.id === CONTROLS_REMOVE_PLACEMARKS_ID) {
            mapHelper.removePlacemarks();
        }

        // ----- Click listener for slider address link ----- //
        if (target.classList.contains(SLIDER_ITEM_LINK_CLASS_NAME)) {
            sliderHelper.addressClickHandler(target);
        }

        // ----- Click listener for slider footer link ----- //
        if (target.classList.contains(SLIDER_LEGEND_LINK_CLASS_NAME)) {
            sliderHelper.legendClickHandler(target);
        }

        // ----- Click listener for slider arrow link ----- //
        if (target.classList.contains(SLIDER_ARROW_LINK_CLASS_NAME)) {
            sliderHelper.arrowClickHandler(target);
        }
    }

    submitHandler(e) {
        e.preventDefault();

        let target = e.target;

        // ----- Click listener for submit review form ----- //
        if (target.id === REVIEW_FORM_ID) {
            let data = this.serialazeForm(target);

            storageHelper.setLocalStorage(data.address, data.review);
            viewHelper.renderReviewForm({
                address: data.address,
                coords: data.review.coords,
                reviews: storageHelper.getLocalStorage(data.address)
            });
            mapHelper.setPlacemarks([{
                address: data.address,
                coords: data.review.coords
            }]);
        }
    }

    serialazeForm(form) {
        return {
            address: form.reviewAddress.value,
            review: {
                name: form.reviewName.value,
                place: form.reviewPlace.value,
                comment: form.reviewComment.value,
                datetime: new Date().toLocaleDateString(),
                coords: form.reviewCoords.value
            }
        };
    }

    setHandlers() {
        document.body.addEventListener('click', (e) => this.clickHandler(e));
        document.body.addEventListener('submit', (e) => this.submitHandler(e));
    }
}

module.exports = new Listeners;