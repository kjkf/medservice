"use strict";

var currentUserAgent = navigator.userAgent.toLowerCase();
var isIphone = currentUserAgent.indexOf('iphone') > -1 || currentUserAgent.indexOf('ipad') > -1;
var isSafari = (currentUserAgent.indexOf('safari') > -1 && currentUserAgent.indexOf('win') === -1) && (currentUserAgent.indexOf('mobile') === -1 || isIphone);
var winowHeight = window.innerHeight;
var winowWidth = window.innerWidth;
var container = document.querySelector(".container");
container.style.height = winowHeight - (parseInt(container_pt) + parseInt(container_pb)) + "px";
if (isSafari) {
    container.style.height = winowHeight;
    container.style.background = 'green';
}

