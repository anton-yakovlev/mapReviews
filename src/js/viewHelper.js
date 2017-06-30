// ----- View methods ----- //

const storageHelper = require('./storageHelper');
const errorTemplate = require('./../hbs/errorTemplate.hbs');
const reviewFormTemplate = require('./../hbs/reviewFormTemplate.hbs');
const DEFAULT_ERROR_TEXT = 'Что-то пошло не так, пожалуйста, попробуйте перезагрузить страницу';


const allFriendsListElement = document.querySelector('#allFriendsList .user-list');
const savedFriendsListElement = document.querySelector('#savedFriendsList .user-list');
const appContainer = document.getElementById('mapReviewAppContainer');
const dialogContainer = document.getElementById('dialogContainer');

class ViewHelper {
    // ----- Render review form ----- //
    renderReviewForm(model) {
        dialogContainer.innerHTML = reviewFormTemplate(model);
    }

    // ----- Show errors ----- //
    showError(message) {
        appContainer.innerHTML = errorTemplate({
            message: 'Ошибка: ' + message || DEFAULT_ERROR_TEXT
        });
    }
}

module.exports = new ViewHelper;