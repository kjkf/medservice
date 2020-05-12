"use strict";

// ============ Вывести диалоговое окно о создании протокола
var createProtocolBtn = document.querySelector('#createProtocolBtn');
var createProtocolTempate = document.querySelector('#createProtocolDialog').innerHTML;

var saveProtocolBtn = document.querySelector('#saveProtocolBtn');
var saveProtocolDialog = document.querySelector('#saveProtocolDialog').innerHTML;

var addRecomendBtn = document.querySelector('#addRecomend');
var addRecomendTempate = document.querySelector('#addRecomendDialog').innerHTML;
var template = document.querySelector('#modal-template').innerHTML;

var dialogSimpleTemplate = document.querySelector('#dialogSimpleTemplate').innerHTML;

// диалоговое окно на кнопку Сохранить протокол
saveProtocolBtn.addEventListener('click', function (e) {
    return showCreateDialog(saveProtocolDialog, saveProtocolDialogShow);
});

// диалоговое окно на кнопку Создать протокол
createProtocolBtn.addEventListener('click', function (e) {
    const dialog = showCreateDialog(createProtocolTempate, saveProtocolDialogShow);

    // инициализация событий переключателя
    const radio = dialog.container.querySelectorAll('input[name=radio]');
    radio.forEach(r => {
        r.addEventListener('click', e => {
            const layer = r.closest('.dial-layer');
            const active = dialog.container.querySelector('.dial-layer.active');
            active.classList.remove('active');
            layer.classList.add('active');
        });
        const btn = r.closest('label').nextElementSibling;
        btn.addEventListener('click', () => {
            console.log(r.checked);
            r.checked = !r.checked;
            r.click();
        })
    });

    // выпадающий список
    const dropListInputs = document.querySelectorAll('.drop-list__input');
    dropListInputs.forEach(input => {
        const dropList = input.closest('.drop-list');
        input.addEventListener('focus', e => {
            dropList.classList.add('active');
        });

        input.addEventListener('blur', e => {
            const timer = setTimeout(() => {
                //dropList.classList.remove('active');
            }, 200);

        });

        const results = dropList.querySelector('.drop-list__res');
        results.addEventListener('click', event =>{
            if (event.target.tagName === 'UL') return;
            const span = event.target.tagName === 'SPAN' ? event.target : event.target.querySelector('span');
            input.value = span.innerHTML;//.slice(1);
            dropList.classList.remove('active');
        });
    });

    const syncBtn = dialog.container.querySelector('#btn-sync');
    const assignBtn = dialog.container.querySelector('#btn-assign');

    // обрабатывает клик на кнопку  Назначить пациенту
    assignBtn.addEventListener('click', e => {
        dialog.close();
        createProtocolDialogShow();
    });
// обрабатывает клик на кнопку  Оформить доставку
    syncBtn.addEventListener('click', e => {
        dialog.close();
        deliverySuccessDialogShow();
    });
});

//обрабатывает клик на кнопку Добавить рекомендации
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

function saveProtocolDialogShow() {
    const template = prepareTemplate(dialogSimpleTemplate, 'Протокол № 1234 успешно сохранен', 'large');
    showCreateDialog(template);
}

function deliverySuccessDialogShow() {
    const template = prepareTemplate(dialogSimpleTemplate, 'Доставка оформлена', '');
    showCreateDialog(template);
}

function createProtocolDialogShow() {
    const template = prepareTemplate(dialogSimpleTemplate, 'Протокол успешно синхронизирован со страницей пациента', 'synch');
    showCreateDialog(template);
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
    if (closeButton) {
        closeButton.addEventListener('click', function (e) {
            document.body.removeChild(container);
        });
    }
    var createButton = container.querySelector('#create');
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            document.body.removeChild(container);
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
            if (!createButton) return;
            createButton.addEventListener('click', function (e) {
                document.body.removeChild(container);
                if (action) action();
            });
        }
    };
}

/*
* Функция, подготавливает шаблон для вывода одинаковых диалоговых окон
* */
function prepareTemplate(template, text, className) {
    let div = document.createElement('div');
    div.innerHTML = template;
    const textDiv = div.querySelector('.dial-window__text');
    textDiv.textContent = text;
    if (className) {
        const wrapper = div.querySelector('.dial-window--simple');
        wrapper.classList.add(className);
    }

    return div.innerHTML;
}

function showCreateDialog(dialogTempate, addAction) {
    var dialog = createDialog(dialogTempate, addAction);
    dialog.open();
    dialog.setAction(addAction);
    return dialog;
}

// ============ Вывести диалоговое окно о добавлении нового препарата
var measureUnits;
var drugsReleaseForms;

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
        const template = prepareTemplate(dialogSimpleTemplate, 'Препарат успешно добавлен', '');
        showCreateDialog(template);
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
