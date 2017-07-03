// ----- Slider methods ----- //
const viewHelper = require('./viewHelper');
const storageHelper = require('./storageHelper');
const REVIEW_SLIDER_ID = 'reviewSlider';
const SLIDER_ITEM_CLASS_NAME = 'slider__list-item';
const SLIDER_LEGENG_CLASS_NAME = 'slider__footer-list-item';
const ACTIVE_CLASS_NAME = 'active';

let currentValue = 0;
let sliderElement;
let allItems;
let allItemLegends;

const arrowClickHelper = {
    arrowLeft: (value, limit) => {
        return value - 1 < 0 ? limit : value - 1;
    },
    arrowRight: (value, limit) => {
        return value + 1 > limit ? 0 : value + 1;
    }
};

class SliderHelper {
    // ----- Init slider ----- //
    init() {
        sliderElement = document.getElementById(REVIEW_SLIDER_ID);
        allItems = sliderElement.querySelectorAll('.' + SLIDER_ITEM_CLASS_NAME);
        allItemLegends = sliderElement.querySelectorAll('.' + SLIDER_LEGENG_CLASS_NAME);

        const firstItem = allItems[currentValue];
        const firstItemLegend = allItemLegends[currentValue];

        firstItem.classList.add(ACTIVE_CLASS_NAME);
        firstItemLegend.classList.add(ACTIVE_CLASS_NAME);
    }

    // ----- Address click handler ----- //
    addressClickHandler(target) {
        const address = target.dataset.address;
        const reviews = storageHelper.getLocalStorage(address);

        viewHelper.renderReviewForm({
            address: address,
            coords: reviews[0].coords,
            reviews: reviews
        });
    }

    updateActiveClass(array, id) {
        array.forEach((item) => {
            item.classList.remove(ACTIVE_CLASS_NAME);

            if (item.dataset.id === id.toString()) {
                item.classList.add(ACTIVE_CLASS_NAME);
            }
        });
    }

    // ----- Legend click handler ----- //
    legendClickHandler(target) {
        const clickedId = target.dataset.id;

        currentValue = clickedId;
        this.updateActiveClass(allItems, clickedId);
        this.updateActiveClass(allItemLegends, clickedId);
    }

    arrowClickHandler(target) {
        const limit = allItemLegends.length - 1;
        const clickedId = arrowClickHelper[target.dataset.id](currentValue, limit);

        currentValue = clickedId;
        this.updateActiveClass(allItems, clickedId);
        this.updateActiveClass(allItemLegends, clickedId);
    }
}

module.exports = new SliderHelper;