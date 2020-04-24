"use strict";

var calendar = new CalendarClock('.datetime');
var interval = setInterval(function () {
    return calendar.update();
}, 1000);
var buttons = document.querySelectorAll('.btn--setActive'); // устанавливает обработчики клика для кнопок

// устанавливает обработчиков события клика по меню
for (var i1 = 0; i1 < buttons.length; i1++) {
    var item = buttons[i1];
    setActive(item);
}

function setActive(item) {
    item.addEventListener('click', function () {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            return false;
        }

        var parent = item.parentNode;
        var activeBtn = parent.querySelector('button.active');
        if (activeBtn) activeBtn.classList.remove('active');
        item.classList.add('active');
    });
}

var protocolsUl = document.querySelector('.menu-list');
var protocolsItems = protocolsUl.querySelectorAll('.menu-list__item');
for (var i2 = 0; i2 < protocolsItems.length; i2++) {
    var item = protocolsItems[i2];
    setActiveProtocolHandler(item);
}

function setActiveProtocolHandler(item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        var activeItem = protocolsUl.querySelector('.menu-list__item.active');
        if (activeItem) activeItem.classList.remove('active');
        item.classList.add('active');
    });
} // поиск(фильтрация) протоколов

var searchProtocolsFld = document.getElementById('searchProtocols');
var emptyResultsDiv = document.querySelector('.isEmptyResults');
var protocolsUl_height;
var isLoad = true;
searchProtocolsFld.addEventListener('focus', function (e) {
    if (window.innerWidth <= 1024) {
        if (isLoad) {
            protocolsUl_height = protocolsUl.getBoundingClientRect().height;
            isLoad = false;
        }
        var height = protocolsUl_height - 230;
        protocolsUl.style.height = `${height}px`;
    }
});

searchProtocolsFld.addEventListener('blur', function (e) {
    if (window.innerWidth <= 1024) {
        protocolsUl.style.height = `${protocolsUl_height}px`;
    }
});
searchProtocolsFld.addEventListener('input', function (e) {
    console.log('input');
    var key = e.target.value.toLowerCase();
    throttle(function () {
        var items = [];
        var isEmpty = true;

        var lis = protocolsUl.querySelectorAll('.menu-list__item');
        var count = lis.length;
        for (var i3 = 0; i3 < lis.length; i3++) {
            var item = lis[i3];
            count += findProtocolHandler(item, key);
        }

        if (count === 0) {
            emptyResultsDiv.classList.remove('hide');
        } else {
            emptyResultsDiv.classList.add('hide');
        }
    }, 3000)();
}); //Обработка клика по кнопки сохраненные протокола

function findProtocolHandler(item, key) {
    var currentItemValue = item.querySelector('a').innerHTML.toLowerCase();

    if (currentItemValue.indexOf(key) === -1) {
        item.classList.add('hide');
        return -1;
    } else {
        item.classList.remove('hide');
        return 1;
    }
}

var protocolBtn = document.querySelector('.btn-protocol');
var returnList = document.querySelector('.return-list');
var menuList = document.querySelector('.menu-list');
var menuList1stChild = menuList.firstElementChild;
var menuListLi_marginBottom = 15;
protocolBtn.addEventListener('click', function (e) {
    MAIN_PANEL.classList.add('return-unfold');
    var menuListBox = menuList.getBoundingClientRect();
    var menuList1stChildBox = menuList1stChild.getBoundingClientRect();
    var height = menuListBox.height - menuList1stChildBox.height - menuListLi_marginBottom;
    /*console.log(menuListBox.height, menuList1stChildBox.height);
    console.log(height);*/

    returnList.style.height = height + "px";
    returnList.style.minHeight = height + "px";
});
var returnBtn = document.querySelector('.btn-return');
returnBtn.addEventListener('click', function (e) {
    MAIN_PANEL.classList.remove('return-unfold');
}); // перенос кнопки Добавить рекомендации

if (window.innerWidth <= 1023) {
    var footer = document.querySelector('.block--footer');
    var btnRecomendWrap = document.querySelector('.btn-recomend-wrap');
    var addRecomendsBtn = footer.removeChild(footer.querySelector('.btn-recomend'));
    btnRecomendWrap.appendChild(addRecomendsBtn);
} //Обработка клика по сохраненному протоколу

if ((window.innerWidth < 1348) && (window.innerWidth >= 1024)) {
    var blocks = document.querySelectorAll('.block');
    for (var i = 0; i < blocks.length; i++) {
        var current = blocks[i];
        if (!current.classList.contains('block-head') && !current.classList.contains('block--footer')) {
            var leftCol = current.querySelector('.col .block__layer--left');
            var rightCol = current.querySelector('.col .block__layer--right');
            var displacedLeft = current.querySelector('.block__layer--center .inside-block:first-child');
            var displacedRight = current.querySelector('.block__layer--center .inside-block:last-child');

            /*leftCol.prepend(displacedLeft);
            rightCol.prepend(displacedRight);*/
            leftCol.insertBefore(displacedLeft, leftCol.firstElementChild);
            rightCol.insertBefore(displacedRight, rightCol.firstElementChild);
        }
    }
}

var returnItemsList = document.querySelectorAll('.return-list__item');

for (var i4 = 0; i4 < returnItemsList.length; i4++) {
    var item = returnItemsList[i4];
    toggleActiveClassHandler(item);
}

function toggleActiveClassHandler(item) {
    item.addEventListener('click', function (e) {
        return togleActiveClass(item);
    });
}