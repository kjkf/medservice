"use strict";

// ======= Работа с подсказками
//alert('1');
var button = document.querySelector('#testModal');
var POPUP_TEMPLATE = document.querySelector('#modal-template').innerHTML;
var popupIndex = 1;
window.addEventListener("DOMContentLoaded", function (e) {
    setTimeout(function () {
        //return findPopup(popupIndex);
    }, 500);
});

function createModal(elem, parentBlock) {
    //alert('4');
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
    if (!parentBlock.classList.contains('main-panel')) {
        var mainPanel = document.querySelector('.main-panel');
        mainPanel.style.zIndex = '0';
    }

    var btn = container.querySelector('#popupClose');
    btn.addEventListener('click', function (e) {
        //document.body.removeChild(container);
        parentBlock.removeChild(container);
        elem.classList.remove('hightlight');
        var mainPanel = document.querySelector('.main-panel');
        mainPanel.style.zIndex = '100';
        findPopup(++popupIndex);
    });
    return container;
}

function showModal(elem) {
    //alert('3');
    var position = elem.dataset.popupPosition;
    //var parentBlock = elem.closest('.popup-wrapper');
    var parentBlock = getClosestParent(elem, 'popup-wrapper');
    var modal = createModal(elem, parentBlock); //document.body.appendChild(modal);
    //alert('3__1');
    parentBlock.appendChild(modal);
    var contentBlock = modal.querySelector('.popup__container');
    var pos = position.split('-');
    var x = pos[1],
        y = pos[0];
    //alert('3__2');
    var coords = elem.getBoundingClientRect();
    var left = x === 'left' ? coords.left : coords.right - contentBlock.offsetWidth - 10;
    var top = y === 'top' ? coords.bottom + 35 : coords.top - contentBlock.offsetHeight - 50;

    //alert('3__3');
    if (elem.classList.contains('mainContent_footer')) {
        left = left - 20;
        top = top + 20;
    }
    //alert('3__4');
    elem.classList.add('hightlight');
    contentBlock.style.left = left + "px";
    contentBlock.style.top = top + "px";
    //alert('3__5');
}

function findPopup(index) {
    //alert('2');
    var selector = "[data-popup-index=\"" + index + "\"]";
    var elem = document.querySelector(selector);

    if (elem) {
        if (window.innerWidth < 1024 && index === 3) return false;
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
