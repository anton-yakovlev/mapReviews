// ----- Storage methods ----- //

const STORAGE_NAME = 'reviews';
const currentStorage = {};

class StorageHelper {
    saveLocalStorage() {
        const savedFriends = this.getCurrentStorage();

        localStorage.removeItem(STORAGE_SAVED);
        localStorage.setItem(STORAGE_SAVED, JSON.stringify(savedFriends));
    }

    getLocalStorage() {
        return JSON.parse(localStorage.getItem(STORAGE_NAME)) || null;
    }

    setCurrentStorage(model, storageName) {
        currentStorage.items[storageName] = model;
    }

    getCurrentStorage(storageName) {
        return currentStorage.items[storageName];
    }

    setSearchOption(storageName, value) {
        currentStorage.search[storageName] = value;
    }

    getSearchOption(storageName) {
        return currentStorage.search[storageName];
    }

    normalizeFriends(model) {
        const localStorageFriends = this.getLocalStorage();

        if (!localStorageFriends) {
            return {
                [STORAGE_ALL]: model
            }
        }

        const localStorageFriendsIds = localStorageFriends.map(item => {
            return item.id;
        });

        const allFriends = model.filter(item => {
            return localStorageFriendsIds.indexOf(item.id) < 0;
        });

        return {
            [STORAGE_ALL]: allFriends,
            [STORAGE_SAVED]: localStorageFriends
        }
    }
}

module.exports = new StorageHelper;