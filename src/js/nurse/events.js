;(function () {
    "use strict";

    var calendar = new CalendarClock('.datetime');
    var interval = setInterval(function () {
        return calendar.update();
    }, 1000);

    const table = document.querySelector('.scrolledBody');
    var instance = OverlayScrollbars(document.querySelector('.table_wrapper'), { });
    console.log( $('#nurse_table'));
    $('#nurse_table').floatThead({
        position: 'fixed'
    });
    $('#nurse_table').floatThead('reflow');
})();
