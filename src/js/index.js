// ----- Put styles to webpack build ----- //
require('normalize.css');
require('../css/styles.scss');

// ----- Get Helpers and required libraries ----- //
const vkHelper = require('./vkHelper');
const viewHelper = require('./viewHelper');
const listenerHelper = require('./listenersHelper');
const storageHelper = require('./storageHelper');
const STORAGE_ALL = 'allFriends';
const STORAGE_SAVED = 'savedFriends';

// ----- Start set listeners ----- //
listenerHelper.setHandlers();

// ----- Start App ----- //
try {
    new Promise(resolve => window.onload = resolve)
        .then(() => vkHelper.init(VK)) // eslint-disable-line
        .then(() => {
            return vkHelper.api('friends.get', {
                user_id: 10000,
                fields: 'id,photo_200,city,country'
            }, VK) // eslint-disable-line
        })
        .then(friends => {
            let currentStorage = storageHelper.normalizeFriends(friends);
            let allFriendsStorage = currentStorage[STORAGE_ALL] || [];
            let savedFriendsStorage = currentStorage[STORAGE_SAVED] || [];

            storageHelper.setCurrentStorage(allFriendsStorage, STORAGE_ALL);
            storageHelper.setCurrentStorage(savedFriendsStorage, STORAGE_SAVED);

            viewHelper.renderFriends(allFriendsStorage, STORAGE_ALL);
            viewHelper.renderFriends(savedFriendsStorage, STORAGE_SAVED);
        })
        .catch(e => {
            viewHelper.showError(e.message);
        });
} catch (e) {
    viewHelper.showError(e.message);
}

