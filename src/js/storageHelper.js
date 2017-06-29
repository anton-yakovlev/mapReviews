// ----- Storage methods ----- //

const STORAGE_ALL = 'allFriends';
const STORAGE_SAVED = 'savedFriends';
const currentStorage = {
    items: {
        [STORAGE_ALL]: [],
        [STORAGE_SAVED]: []
    },
    search: {
        [STORAGE_ALL]: '',
        [STORAGE_SAVED]: ''
    }
};

class StorageHelper {
    saveLocalStorage() {
        const savedFriends = this.getCurrentStorage(STORAGE_SAVED);

        localStorage.removeItem(STORAGE_SAVED);
        localStorage.setItem(STORAGE_SAVED, JSON.stringify(savedFriends));
    }

    getLocalStorage(storageName = STORAGE_SAVED) {
        return JSON.parse(localStorage.getItem(storageName)) || null;
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