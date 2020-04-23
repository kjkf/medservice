"use strict";

// ======= Работа с подсказками (страница медсестры)
//alert('1');

var POPUP_TEMPLATE = document.querySelector('#popup-template').innerHTML;
var popupIndex = 1;
window.addEventListener("DOMContentLoaded", function (e) {
    if (window.innerWidth > 768) {
        setTimeout(function () {
            //return findPopup(popupIndex);
        }, 500);
    }
});

function createModal(elem, parentBlock) {
    var container = document.createElement('div');
    container.className = 'popup';
    container.innerHTML = POPUP_TEMPLATE;
    var content = elem.dataset.popupText;
    var anchorClass = elem.dataset.popupPosition;
    var dialWindow = container.querySelector('.dial-window');
    dialWindow.classList.add(anchorClass);
    var popupText = container.querySelector('.dial-window__text');
    popupText.innerHTML = content;
    var popupContainer = container.querySelector('.popup__container');
    popupContainer.classList.add('pos_abs');

    var btn = container.querySelector('#popupClose');
    btn.addEventListener('click', function (e) {
        //document.body.removeChild(container);
        parentBlock.removeChild(container);
        elem.classList.remove('hightlight');
        findPopup(++popupIndex);
    });
    return container;
}

function showModal(elem) {
    var position = elem.dataset.popupPosition;

    //var parentBlock = elem.closest('.popup-wrapper');
    var parentBlock = getClosestParent(elem, 'popup-wrapper');
    var modal = createModal(elem, parentBlock); //document.body.appendChild(modal);
    parentBlock.appendChild(modal);
    var contentBlock = modal.querySelector('.popup__container');
    var pos = position.split('-');
    var x = pos[1],
        y = pos[0];

    var coords = elem.getBoundingClientRect();
    var left = x === 'left' ? coords.left : coords.right - contentBlock.offsetWidth - 10;
    var top = y === 'top' ? coords.bottom + 35 : coords.top - contentBlock.offsetHeight - 50;

    if (elem.classList.contains('table_wrapper')) {
        left = coords.left - contentBlock.offsetWidth / 2;
        top = top + 20;
    }
    if (elem.classList.contains('reminder-item-wrap')) {
        left = left - 20;
        top = top - 20;
    }
    if (elem.tagName === 'TD') {
        if (elem.classList.contains('research-popup')) {
            left = left + 25;
            top = top + 30;
        } else {
            left = left + 25;
            top = top + 40;
        }

    }

    elem.classList.add('hightlight');
    contentBlock.style.left = left + "px";
    contentBlock.style.top = top + "px";
}

function findPopup(index) {
    var selector = "[data-popup-index=\"" + index + "\"]";
    var elem = document.querySelector(selector);

    if (elem) {
        if (window.innerWidth <= 768 && index === 3) return false;
        showModal(elem);
    }
}

function getClosestParent(elem, className) {
    var parent = elem.parentNode;
    if (parent) {
        while (parent) {
            if (parent.classList.contains(className)) {
                //console.log(parent);
                return parent;
            }
            parent = parent.parentNode
        }
    }
}
