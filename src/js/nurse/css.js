
"use strict";

var currentUserAgent = navigator.userAgent.toLowerCase();
var isIphone = currentUserAgent.indexOf('iphone') > -1 || currentUserAgent.indexOf('ipad') > -1;
var isSafari = (currentUserAgent.indexOf('safari') > -1 && currentUserAgent.indexOf('win') === -1) && (currentUserAgent.indexOf('mobile') === -1 || isIphone);
var winowHeight = window.innerHeight;
var winowWidth = window.innerWidth;
var container = document.querySelector(".container");

/*
if (isSafari) {
    container.style.height = winowHeight;
}
*/


function getStyle(elem, propertyName) {
    return getComputedStyle(elem)[propertyName];
}

var table_wrapper = document.querySelector(".table_wrapper");
var table_container = document.querySelector(".table_container");
var content_title = document.querySelector(".content-title");
var content_block = document.querySelector(".content-block");
var header_block = document.querySelector(".header-block");
var nurse_main = document.querySelector(".nurse-main");
var nurse_page = document.querySelector(".nurse-page");

var content_title_h = content_title.clientHeight;
var content_title_mb = getStyle(content_title, 'margin-bottom');


var content_block_pt = getStyle(content_block, 'padding-top');
var content_block_pb = getStyle(content_block, 'padding-bottom');

var header_block_h = header_block.clientHeight;
var header_block_mb = getStyle(header_block, 'margin-bottom');

var nurse_main_pt = getStyle(nurse_main, 'padding-top');
var nurse_main_pb = getStyle(nurse_main, 'padding-bottom');

var nurse_page_pt = getStyle(nurse_page, 'padding-top');
var nurse_page_pb = getStyle(nurse_page, 'padding-bottom');


table_wrapper.style.height =
    parseInt(winowHeight) -
    parseInt(nurse_page_pt) -
    parseInt(nurse_page_pb) -
    parseInt(nurse_main_pt) -
    parseInt(nurse_main_pb) -
    parseInt(header_block_mb) -
    parseInt(header_block_h) -
    parseInt(content_block_pb) -
    parseInt(content_block_pt) -
    parseInt(content_title_mb) -
    parseInt(content_title_h) + "px";

table_container.style.height = table_wrapper.style.height;
table_wrapper.style.maxHeight = table_wrapper.style.height;