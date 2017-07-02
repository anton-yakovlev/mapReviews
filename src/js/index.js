// ----- Put styles to webpack build ----- //
require('normalize.css');
require('../css/styles.scss');

// ----- Get Helpers and required libraries ----- //
const mapHelper = require('./mapHelper');
const viewHelper = require('./viewHelper');
const listenerHelper = require('./listenersHelper');
// const storageHelper = require('./storageHelper');

/* global ymaps */

// ----- Start set listeners ----- //
listenerHelper.setHandlers();

// ----- Start App ----- //
try {
    new Promise(resolve => window.onload = resolve)
        .then(() => new Promise(resolve => ymaps.ready(resolve)))
        .then( () => {
            mapHelper.createMap();
            mapHelper.listeners();
            mapHelper.updateMap();
        })
        .catch(e => {
            viewHelper.showError(e.message);
        });
} catch (e) {
    viewHelper.showError(e.message);
}

