;(function () {
    "use strict";

    var calendar = new CalendarClock('.datetime');
    var interval = setInterval(function () {
        return calendar.update();
    }, 1000);
})();