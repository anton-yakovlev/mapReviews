// ----- Event listeners ----- //
const viewHelper = require('./viewHelper');
const storageHelper = require('./storageHelper');
const mapHelper = require('./mapHelper');
const CLOSE_DILAOG_ID = 'closeDialog';
const RELOAD_AFTER_ERROR_ID = 'reloadAfterError';
const REVIEW_FORM_ID = 'reviewForm';
const CONTROLS_REMOVE_PLACEMARKS_ID = 'removePlacemarks';

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

        // ----- Click listener for rmove placemarks button ----- //
        if (target.id === CONTROLS_REMOVE_PLACEMARKS_ID) {
            mapHelper.removePlacemarks();
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