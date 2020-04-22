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
        layer.addEventListener('click', e => {
            const targetParent = e.target.parentNode;
            if (!targetParent.classList.contains('layer__top') && !targetParent.classList.contains('layer') ) return;
            setActive(layer)
        })
    });

    const schedule_list__item = document.querySelectorAll('.schedule-list__item');

    schedule_list__item.forEach(schedule_list__item_i => {
        schedule_list__item_i.addEventListener('click', e => {
            console.log(e.target.parentNode);
            const targetParent = e.target.parentNode;
            //if (!targetParent.classList.contains('layer__top') && !targetParent.classList.contains('layer') ) return;
            setActive(schedule_list__item_i)
        })
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
