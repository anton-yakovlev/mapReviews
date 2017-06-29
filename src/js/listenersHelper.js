// ----- Event listeners ----- //

class Listeners {
    clickHandler(e) {
        let target = e.target;

        // ----- Click listener for plus button ----- //
        if (target.classList.contains(plusClassName)) {
            this.moveFriend(target, STORAGE_ALL, STORAGE_SAVED);
        }

        // ----- Click listener for remove button ----- //
        if (target.classList.contains(removeClassName)) {
            this.moveFriend(target, STORAGE_SAVED, STORAGE_ALL);
        }

        // ----- Click listener for reload button after error ----- //
        if (target.id === reloadAfterErrorId) {
            location.reload();
        }
    }

    setHandlers() {
        document.body.addEventListener('click', (e) => this.clickHandler(e));
    }
}

module.exports = new Listeners;