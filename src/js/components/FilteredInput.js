"use strict";
(function () {
    var filterWrapper = document.getElementsByClassName('filtered-input')[0];
    var input = filterWrapper.getElementsByClassName('filterInput')[0];
    var results = filterWrapper.getElementsByClassName('filterResults')[0];
    var fieldBox = document.getElementsByClassName('field-box')[0];
    input.addEventListener('input', function (e) {
        throttle(function () {
            var str = e.target.value;
            var data = [{"drug":"Кетамин","dosage":320,"units":"ЕД","releaseForm":"system"},{"drug":"Пропофол","dosage":1320,"units":"mg","releaseForm":"capsule"},{"drug":"Прокаин","dosage":540,"units":"ml","releaseForm":"ampoule"},{"drug":"Лидокаин","dosage":110,"units":"ml","releaseForm":"pill"},{"drug":"Бупивакаин","dosage":342,"units":"mg","releaseForm":"bottle"},{"drug":"Адреналин","dosage":109,"units":"ЕД","releaseForm":"suppositories"},{"drug":"Атропин","dosage":1420,"units":"ml","releaseForm":"ampoule"},{"drug":"Морфин","dosage":50,"units":"ЕД","releaseForm":"pill"},{"drug":"Кетамин","dosage":854,"units":"ml","releaseForm":"system"},{"drug":"Ацетилсалициловая кислота","dosage":100,"units":"ЕД","releaseForm":"pill"},{"drug":"Ибупрофен","dosage":400,"units":"mg","releaseForm":"ampoule"},{"drug":"Парацетамол","dosage":320,"units":"ЕД","releaseForm":"system"},{"drug":"Кетопрофен","dosage":320,"units":"mg","releaseForm":"bottle"},{"drug":"Диклофенак","dosage":320,"units":"ml","releaseForm":"pill"},{"drug":"Морфин","dosage":320,"units":"ЕД","releaseForm":"pill"},{"drug":"Фентанил","dosage":320,"units":"ЕД","releaseForm":"system"},{"drug":"Метадон","dosage":320,"units":"mg","releaseForm":"capsule"},{"drug":"Трамадол","dosage":320,"units":"ЕД","releaseForm":"ampoule"},{"drug":"Амитриптилин","dosage":320,"units":"ml","releaseForm":"pill"},{"drug":"Дексаметазон","dosage":320,"units":"ml","releaseForm":"suppositories"},{"drug":"Диазепам","dosage":320,"units":"ЕД","releaseForm":"ampoule"},{"drug":"Флуоксетин","dosage":320,"units":"ml","releaseForm":"pill"},{"drug":"Гиосцин бутилбромид","dosage":235,"units":"ЕД","releaseForm":"capsule"},{"drug":"Лактулоза","dosage":320,"units":"ml","releaseForm":"ampoule"},{"drug":"Сенна","dosage":320,"units":"mg","releaseForm":"capsule"},{"drug":"Лоперамид","dosage":320,"units":"ml","releaseForm":"suppositories"},{"drug":"Метоклопрамид","dosage":420,"units":"ЕД","releaseForm":"capsule"},{"drug":"Ондансетрон","dosage":1320,"units":"ml","releaseForm":"ampoule"},{"drug":"Мидазолам","dosage":3620,"units":"mg","releaseForm":"ampoule"}];
            var res = data.filter(function (item) {
                return item.drug.toLowerCase().indexOf(str.toLowerCase()) > -1;
            }).map(function (item) {
                var templ = "<li class=\"filterResults--item\">\n                    <span class=\"drug-info-item drug-name\">" + item.drug + "</span>\n                    <span class=\"drug-info-item drug-dosage drug-dosage--sm\">" + item.dosage + "</span>\n                    <span class=\"drug-info-item unit unit--sm\">" + item.units + "</span>\n                    <span class=\"drug-info-item drugs drugs--" + item.releaseForm + "\"><svg class=\"icon\"><use xlink:href=\"images/drug_sprite.svg#icon_drugs_" + item.releaseForm + "_hover\"></use></svg></span>\n                </li>";
                return templ;
            });
            results.innerHTML = res.join('');
            results.style.display = 'block';
        }, 3000)();

        if (window.innerWidth > 768 || window.innerWidth <= 834) {
            var fieldBoxPL = parseInt(getComputedStyle(fieldBox).paddingLeft);
            var fieldBoxPR = parseInt(getComputedStyle(fieldBox).paddingRight);
            results.style.width = parseInt(getComputedStyle(fieldBox).width) + fieldBoxPL + fieldBoxPR + "px";
        }

        if (window.innerWidth <= 1024 && window.innerWidth > 768) {
            results.style.height = '110px';
        }
        var lis = results.getElementsByTagName('li');

        for (var i = 0; i < lis.length; i++) {
            var item = lis[i];
            setLiAction (item);
        }
    }); // обработка события потери фокуса

    input.addEventListener('blur', function () {
        setTimeout(function () {
            results.style.display = 'none';
        }, 200);
    }); // устанавливает выбранное значение в поле

    function setFilterResult(item) {
        var dragName = item.getElementsByClassName('drug-name')[0].innerHTML;
        input.value = dragName;
        results.style.display = 'none';
    }

    function setLiAction (item) {
        item.addEventListener('click', function () {
            setFilterResult(item);
        });
    }
})();
