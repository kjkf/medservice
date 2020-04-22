;(function () {
    "use strict";
    const clock = document.querySelector('.datetime');
    if (clock) {
        var calendar = new CalendarClock('.datetime');
        var interval = setInterval(function () {
            return calendar.update();
        }, 1000);
    }

    const tableWrapper = document.querySelector('.table_wrapper');
    if (tableWrapper) {
        var instance = OverlayScrollbars(tableWrapper, {
            resize: 'both',
            scrollbars: {
                autoHide: 'scroll',
                autoHideDelay: 800
            }
        });

        $('#nurse_table').floatThead({
            position: 'fixed'
        });
        $('#nurse_table').floatThead('reflow');
    }

    const layers = document.querySelectorAll('.layer');

    layers.forEach(layer => {
        layer.addEventListener('click', e => setActive(layer))
    });


    function setActive(item) {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            return false;
        }

        var parent = item.parentNode;
        var activeItem = parent.querySelector('.active');
        if (activeItem) activeItem.classList.remove('active');
        item.classList.add('active');
    }
})();
