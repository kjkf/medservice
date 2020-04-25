"use strict";

var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']; // Класс для даты с часами
var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

var CalendarClock = /*#__PURE__*/function () {
    // конструктор класса; инициализация значений
    function CalendarClock(selector) {
        this.$el = document.querySelector(selector);
        this.date = new Date();
        this.timeDiv = this.$el.querySelector('.time-hm');
        this.secondsDiv = this.$el.querySelector('.seconds');
        this.dateDiv = this.$el.querySelector('.date-md');
        this.dayDiv =  this.$el.querySelector('.date-dn');
        var dateStr = months[this.date.getMonth()] + ", " + this.date.getDate();
        this.dateDiv.textContent = dateStr;
        var hourStr = (this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours()) + ":" + (this.date.getMinutes() < 10 ? '0' + this.date.getMinutes() : this.date.getMinutes());
        this.timeDiv.textContent = hourStr;
        this.secondsDiv.textContent = this.date.getSeconds() < 10 ? '0' + this.date.getSeconds() : this.date.getSeconds();
        if (this.dayDiv) this.dayDiv.innerHTML = days[this.date.getDay()] + '<span>,</span>';
    } // метод, который обновляет значения на странице


    var _proto = CalendarClock.prototype;

    _proto.update = function update() {
        this.date = new Date();
        var dateStr = months[this.date.getMonth()] + ", " + this.date.getDate();
        this.dateDiv.textContent = dateStr;
        var hourStr = (this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours()) + ":" + (this.date.getMinutes() < 10 ? '0' + this.date.getMinutes() : this.date.getMinutes());
        this.timeDiv.textContent = hourStr;
        this.secondsDiv.textContent = this.date.getSeconds() < 10 ? '0' + this.date.getSeconds() : this.date.getSeconds();
        if (this.dayDiv) this.dayDiv.innerHTML = days[this.date.getDay()] + '<span>,</span>';
    };

    return CalendarClock;
}();