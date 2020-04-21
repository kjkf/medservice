"use strict";

// ============ Вывести диалоговое окно о создании протокола
var saveProtocolBtn = document.querySelector('#saveProtocolBtn');
var createProtocolTempate = document.querySelector('#createProtocolDialog').innerHTML;
var addRecomendBtn = document.querySelector('#addRecomend');
var addRecomendTempate = document.querySelector('#addRecomendDialog').innerHTML;
var template = document.querySelector('#modal-template').innerHTML;
saveProtocolBtn.addEventListener('click', function (e) {
    return showCreateDialog(createProtocolTempate, addNewProtocol);
});
addRecomendBtn.addEventListener('click', function (e) {
    //return showCreateDialog(addRecomendTempate, addNewRecomend);
    var dialog = showCreateDialog(addRecomendTempate, addNewRecomend);
    var container = dialog.container;
    var textarea = container.querySelector('.textarea-field');
    var overlay = container.querySelector('.overlay');

    textarea.addEventListener('focus', function () {
        if (window.innerWidth <= 1024) {
            var paddingTop = window.innerWidth <= 768 && window.innerWidth > 425 ? '180px' : '50px';
            overlay.style.paddingTop = paddingTop;
            overlay.style.alignItems = 'flex-start';
        }

    })
});

function addNewProtocol() {
    console.log('Add New Protocol!!!');
}

function addNewRecomend() {
    console.log('Add New Recomend!!!');
}

function createDialog(dialogTempate) {
    var container = document.createElement('div');
    container.className = 'popup';
    container.innerHTML = template;
    var overlay = container.querySelector('.overlay');
    overlay.classList.add('dialog--flex-display');
    var popupContainer = container.querySelector('.popup__container');
    popupContainer.innerHTML = dialogTempate;
    var action = {};
    var closeButton = container.querySelector('#cancel');
    closeButton.addEventListener('click', function (e) {
        document.body.removeChild(container);
    });
    var createButton = container.querySelector('#create');
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closeButton.click();
        }
    });
    return {
        container: container,
        open: function open() {
            document.body.appendChild(container);
        },
        close: function close() {
            document.body.removeChild(container);
        },
        setAction: function setAction(action) {
            createButton.addEventListener('click', function (e) {
                action();
                document.body.removeChild(container);
            });
        }
    };
}

var measureUnits;
var drugsReleaseForms;

function showCreateDialog(dialogTempate, addAction) {
    var dialog = createDialog(dialogTempate, addAction);
    dialog.open();
    dialog.setAction(addAction);
    return dialog;
} // ============ Вывести диалоговое окно о добавлении нового препарата


var addNewDrugBtn = document.querySelector('#addNewDrug');
var addNewDrugTemplate = document.querySelector('#addNewDrugTemplate').innerHTML;
addNewDrugBtn.addEventListener('click', function (e) {
    var dragDialog = showCreateDialog(addNewDrugTemplate, addNewDrug); //console.log('isSafari === ', isSafari, dragDialog);

    var container = dragDialog.container;

    if (isSafari) {
        var dragNameInputWrapper = container.querySelector('.input-field__wrap');
        var dragNameInput = dragNameInputWrapper.querySelector('.drag-name');
        var pl = getStyle(dragNameInput, 'padding-left');
        var pr = getStyle(dragNameInput, 'padding-right');
        var width = dragNameInputWrapper.getBoundingClientRect().width - parseInt(pl) - parseInt(pr);
        dragNameInput.style.width = "".concat(width, "px");
    }

    measureUnits = container.querySelectorAll('.unit');

    for (var i5=0; i5<measureUnits.length; i5++) {
        var unit = measureUnits[i5];
        measureUnitsHandler(unit)
    }
    drugsReleaseForms = container.querySelectorAll('.dial-window--drug .drugs');

    for (var i6=0; i6<drugsReleaseForms.length; i6++) {
        var item = drugsReleaseForms[i6];
        drugsReleaseFormsHandler(item)
    }

    var incrementInput = document.querySelector('.increment-input--dialog');

    createIntervalInput(incrementInput);
});

function addNewDrug() {
    console.log('Add New Drug!!!');
}

function togleActiveClass(elem) {
    if (elem.classList.contains('active')) {
        elem.classList.remove('active');
        return false;
    }

    var parent = elem.parentNode;
    var activeBtn = parent.querySelector('.active');
    if (activeBtn) activeBtn.classList.remove('active');
    elem.classList.add('active');
}

function togleActiveClass_drugs(elem) {
    if (elem.classList.contains('active')) {
        elem.classList.remove('active');
        removeActiveSrc(elem);
        return false;
    } else {
        var parent = elem.parentNode;
        var activeBtn = parent.querySelector('.active');

        if (activeBtn) {
            activeBtn.classList.remove('active');
            removeActiveSrc(activeBtn);
        }

        elem.classList.add('active');
        setActiveSrc(elem);
    }
}

function setActiveSrc(elem) {
    var icon = elem.querySelector('use');
    var src = icon.getAttribute('xlink:href');

    if (src.indexOf('_hover') > -1) {
        src = src.replace('_hover', '_active');
    } else {
        src += '_active';
    }

    icon.setAttribute('xlink:href', src);
}

function removeActiveSrc(elem) {
    if (!elem.classList.contains('active')) {
        var icon = elem.querySelector('use');
        var src = icon.getAttribute('xlink:href');
        src = src.replace('_active', '_hover');
        icon.setAttribute('xlink:href', src);
    }
}

function toggleHoverClass(elem, type) {
    if (!elem.classList.contains('active')) {
        var icon = elem.querySelector('use');
        var src = icon.getAttribute('xlink:href');

        if (type === 'over') {
            src = src.replace('_hover', '');
        } else {
            src += '_hover';
        } //console.log(type, '====', src);


        icon.setAttribute('xlink:href', src);
    }
}

function measureUnitsHandler(unit) {
    unit.addEventListener('click', function () {
        togleActiveClass(unit);
    });
}

function drugsReleaseFormsHandler(item) {
    item.addEventListener('click', function() {
        togleActiveClass_drugs(item);
    });
    item.addEventListener('mouseenter', function() {
        toggleHoverClass(item, 'over');
    });
    item.addEventListener('mouseleave',  function() {
        toggleHoverClass(item, 'out')
    });
}

function createIntervalInput(item) {

    var input = item.getElementsByClassName('button-reg__field')[0];
    var minusBtn = item.getElementsByClassName('button-reg__minus')[0];
    var plusBtn = item.getElementsByClassName('button-reg__plus')[0];
    var value = parseInt(input.value) || 0;
    var increment = parseInt(input.getAttribute('increment')) || 1; // инкремент; берется из атрибутов элемента

    minusBtn.addEventListener('click', function (e) {
        value = value - increment < 0 ? 0 : value - increment;
        input.value = value;
    });
    plusBtn.addEventListener('click', function (e) {
        value += increment;
        input.value = value;
    });
    input.addEventListener('blur', function (e) {
        if (!isNaN(parseInt(input.value))) {
            value = parseInt(input.value);
        }

        input.value = value;
    });
}
