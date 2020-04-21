"use strict";

var menu_btn = document.querySelector('.mob-menu');
var main_panel = document.querySelector('.main-panel');
var content = document.querySelector('.content');
menu_btn.addEventListener('click', function (e) {
    return main_panel.classList.add('folded');
});
content.addEventListener('click', function (e) {
    return main_panel.classList.remove('folded');
});