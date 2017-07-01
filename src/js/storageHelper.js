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

    getLocalStorageAll() {
        return JSON.parse(localStorage.getItem(STORAGE_NAME)) || {};
    }

    getLocalStorage(address) {
        return JSON.parse(localStorage.getItem(STORAGE_NAME))[address] || null;
    }
}

module.exports = new StorageHelper;