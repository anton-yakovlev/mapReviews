// ----- Event listeners ----- //
const viewHelper = require('./viewHelper');
const CLOSE_DILAOG_ID = 'closeDialog';
const RELOAD_AFTER_ERROR_ID = 'reloadAfterError';

class Listeners {
    clickHandler(e) {
        let target = e.target;

        // ----- Click listener for plus button ----- //
        /*
            if (target.classList.contains(plusClassName)) {
             this.moveFriend(target, STORAGE_ALL, STORAGE_SAVED);
             }
         */

        // ----- Click listener for reload button after error ----- //
        if (target.id === RELOAD_AFTER_ERROR_ID) {
            location.reload();
        }

        if (target.id === CLOSE_DILAOG_ID) {
            viewHelper.closeDialog();
        }
    }

    setHandlers() {
        document.body.addEventListener('click', (e) => this.clickHandler(e));
    }
}

module.exports = new Listeners;