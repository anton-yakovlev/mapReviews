// ----- Storage methods ----- //
const STORAGE_NAME = 'reviews';

class StorageHelper {
    setLocalStorage(address, model) {
        if (!model || !address) {
            return;
        }

        const currentStorage = this.getLocalStorageAll();

        if (currentStorage[address]) {
            currentStorage[address].push(model);
        } else {
            currentStorage[address] = [model];
        }

        localStorage.removeItem(STORAGE_NAME);
        localStorage.setItem(STORAGE_NAME, JSON.stringify(currentStorage));
    }

    removeLocalStorage() {
        localStorage.removeItem(STORAGE_NAME);
    }

    getLocalStorageAll() {
        return JSON.parse(localStorage.getItem(STORAGE_NAME)) || {};
    }

    getLocalStorage(address) {
        const reviews = this.getLocalStorageAll();

        return reviews[address] || [];
    }
}

module.exports = new StorageHelper;