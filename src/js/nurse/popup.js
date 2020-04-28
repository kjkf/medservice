(function () {
    "use strict";

// ======= Работа с подсказками (страница медсестры)
//alert('1');
    var popupTemlElem = document.querySelector('#popup-template');
    if (!popupTemlElem) return;
    var POPUP_TEMPLATE = popupTemlElem.innerHTML;
    var popupIndex = 1;
    window.addEventListener("DOMContentLoaded", function (e) {
        //if (window.innerWidth > 768) {
        setTimeout(function () {
            //return findPopup(popupIndex);
        }, 500);
        //}
    });

    function createModal(elem, parentBlock) {
        let {y} = {...getPosition(elem)};
        scrollToElem(elem, y);
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
        //var parentBlock = elem.closest('.popup-wrapper');
        var parentBlock = getClosestParent(elem, 'popup-wrapper');
        var modal = createModal(elem, parentBlock); //document.body.appendChild(modal);
        parentBlock.appendChild(modal);
        //document.body.appendChild(modal);
        var contentBlock = modal.querySelector('.popup__container');
        let {x, y} = {...getPosition(elem)};

        setTimeout(() => {
            var coords = elem.getBoundingClientRect();
            var left = x === 'left' ? coords.left : coords.right - contentBlock.offsetWidth - 10;
            var top = y === 'top' ? coords.bottom + 25 : coords.top - contentBlock.offsetHeight - 50;

            if (elem.classList.contains('table_wrapper')) {
                left = coords.left - contentBlock.offsetWidth / 2;
                top = top + 20;
            }
            if (elem.classList.contains('reminder-item-wrap')) {
                left = left - 20;
                top = window.innerHeight < 768 ? top - 200 : top - 150;
            }

            if (elem.tagName === 'TD') {
                if (window.innerWidth >= 1348) {
                    left = left + 20;
                    //top = elem.classList.contains('research-popup') ? top : top + 5;
                    top = top + 25
                } else if (window.innerWidth > 1023) {
                    left = elem.classList.contains('research-popup') ? left : left + 20;
                    top = top + 30;
                } else if (window.innerWidth > 425) {
                    left = left + 20;
                    top = top + 30;
                } else if (window.innerWidth > 374) {
                    left = left + 90;
                    top = top + 30;
                } else {
                    left = 15;
                    top = top + 30;
                }
            }

            if ((top + contentBlock.offsetHeight) > window.innerHeight) {
                top = coords.top - contentBlock.offsetHeight - 50;
                var anchorElem = modal.querySelector('.dial-window');
                var anchorClass = elem.dataset.popupPosition;
                anchorElem.classList.remove(anchorClass);
                anchorClass = anchorClass.replace('top', 'bottom');
                anchorElem.classList.add(anchorClass);
            }

            if ((elem.tagName !== 'TD' && !elem.classList.contains('reminder-item-wrap')) && window.innerHeight > 600) {
                elem.classList.add('hightlight');
            }

            left = left < 0 ? 0 : left;
            top = top < 0 ? 0 : top;

            contentBlock.style.left = left + "px";
            contentBlock.style.top = top + "px";

            const overlay = modal.querySelector('.overlay');
            overlay.classList.add('show');
            //contentBlock.classList.add('show');
        }, 100);


    }

    function findPopup(index) {
        var selector = "[data-popup-index=\"" + index + "\"]";
        var elem = document.querySelector(selector);

        if (elem) {
            setTimeout(() => {
                showModal(elem);
            }, 0)
        }
    }

    function scrollToElem(elem, anchorPosition) {
        var isTop = anchorPosition === 'top' && popupIndex !== 1;
        elem.scrollIntoView(isTop);
        var scrollVall = popupIndex == 1 ? 0 : isTop ? -30 : 30; // магические цифры, - просто мне так захотелось
        window.scrollBy(0, scrollVall)
    }

    function getPosition(elem) {
        var position = elem.dataset.popupPosition;
        var pos = position.split('-');

        return {
            x: pos[1],
            y: pos[0]
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

})();