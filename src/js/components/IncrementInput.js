// Элемент поле с инкементом
"use strict";
;(function() {
    var incrementInputList = document.getElementsByClassName('increment-input');
    //incrementInputList.forEach(function (item) {
    for (var i = 0; i < incrementInputList.length; i++) {
        var item = incrementInputList[i];
        createIntervalInput(item);
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
        input.addEventListener('focus', function (e) {
            if (window.innerWidth <= 1024) {
                var contentIn = document.querySelector('.content__in');
                input.scrollIntoView();
            }
        });
    }

    //});

})();
