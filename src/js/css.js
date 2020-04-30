"use strict";
//alert(navigator.userAgent.toLowerCase());
var currentUserAgent = navigator.userAgent.toLowerCase();
var isIphone = currentUserAgent.indexOf('iphone') > -1 || currentUserAgent.indexOf('ipad') > -1;
var isSafari = (currentUserAgent.indexOf('safari') > -1 && currentUserAgent.indexOf('win') === -1) && (currentUserAgent.indexOf('mobile') === -1 || isIphone);
console.log(currentUserAgent, 'isSafari', isSafari);
var blocks = document.getElementsByClassName("block");
var blocks_wrapper = document.getElementsByClassName("block-wrapper");//for back-end
var filter = document.getElementsByClassName("filter");
var inside_block = document.getElementsByClassName("inside-block");
var menu_list = document.getElementsByClassName("menu-list");
var content_in = document.getElementsByClassName("content__in");
var return_list_item = document.getElementsByClassName("return-list__item");
window.onresize = function () {
    location.reload();
};

var winowHeight = window.innerHeight;
var winowWidth = window.innerWidth;
var container = document.querySelector(".container");
var MAIN_PANEL = document.querySelector(".main-panel");
var mp_header = document.querySelector(".main-panel__header");
var mp_footer = document.querySelector(".main-panel__footer");
var mp_menu_list = document.querySelector(".menu-list");
var contentEl = document.querySelector(".content");
var block_heads = document.querySelector(".block-head");
var mainContent_footer = document.querySelector(".mainContent_footer");
//var dragName = document.querySelector(".drag-name");

function getStyle(elem, propertyName) {
    return getComputedStyle(elem)[propertyName];
}

var container_pt = getStyle(container, 'padding-top');
var container_pb = getStyle(container, 'padding-bottom');
var container_pl = getStyle(container, 'padding-left');
var container_pr = getStyle(container, 'padding-right');
var mp_pt = getStyle(MAIN_PANEL, 'padding-top');
var mp_pb = getStyle(MAIN_PANEL, 'padding-bottom');
var menu_list_mb = getStyle(mp_menu_list, 'margin-bottom');
var menu_list_pt = getStyle(mp_menu_list, 'padding-top');
var mp_left;
var mp_h;
var mp_w;
var mp_header_h;
var mp_footer_h;
var content_h;
var content_w;
var block_head_h;
var mainContent_footer_h;
content_h = winowHeight - parseInt(container_pt) - parseInt(container_pb);
container.style.height = winowHeight - (parseInt(container_pt) + parseInt(container_pb)) + "px";

if (isSafari) {
    container.style.height = winowHeight;
}
MAIN_PANEL.style.top = container_pt;
mp_h = winowHeight - parseInt(container_pt) - parseInt(container_pb) - parseInt(mp_pt) - parseInt(mp_pb);
MAIN_PANEL.style.height = mp_h + "px";
mp_w = MAIN_PANEL.clientWidth;
content_w = winowWidth - mp_w - parseInt(container_pl) - parseInt(container_pr);

if (parseInt(content_w) > 860) {
    content_w = 860;
}

mp_left = winowWidth / 2 - (parseInt(mp_w) + parseInt(content_w)) / 2;
MAIN_PANEL.style.left = mp_left + 'px';
mp_header_h = mp_header.clientHeight;
mp_footer_h = mp_footer.clientHeight;
mp_menu_list.style.height = parseInt(mp_h) - parseInt(mp_header_h) - parseInt(mp_footer_h) - parseInt(menu_list_mb) - parseInt(menu_list_pt) + "px";
contentEl.style.height = content_h + "px";
contentEl.style.width = content_w + "px";
contentEl.style.top = "" + container_pt;
contentEl.style.left = mp_left + mp_w + "px";
block_head_h = block_heads.clientHeight;
mainContent_footer_h = mainContent_footer.clientHeight;
mainContent_footer.style.right = parseInt(container_pr) + "px";
mainContent_footer.style.bottom = parseInt(container_pb) + "px";

mainContent_footer.style.width = content_w + "px";
console.log(content_w);

if (window.innerWidth >= 1024) {
    var containerBox = container.getBoundingClientRect();
    var contentBox = contentEl.getBoundingClientRect();
    mainContent_footer.style.right = containerBox.right - contentBox.right + "px";
    mainContent_footer.style.bottom = containerBox.bottom - contentBox.bottom + "px";
    if (isSafari) {
        mainContent_footer.style.bottom = parseInt(container_pb) + "px";
    }
}

if (window.innerWidth <= 1023) {
    contentEl.style.height = content_h - 56 + "px";

    if (!MAIN_PANEL.classList.contains("folded")) {
        MAIN_PANEL.style.height = "auto";
    } else {
        MAIN_PANEL.style.height = winowHeight - parseInt(container_pt) - parseInt(container_pb) - parseInt(mp_pt) - parseInt(mp_pb) + "px";
    }

    contentEl.addEventListener('click', function (e) {
        if (!MAIN_PANEL.classList.contains("folded")) {
            MAIN_PANEL.style.height = "auto";
        }
    });
    contentEl.style.left = parseInt(container_pl) + "px";
    contentEl.style.width = winowWidth - parseInt(container_pl) - parseInt(container_pr) + "px";

    document.querySelector('.mob-menu').addEventListener('click', function (e) {
        mp_header_h = mp_header.clientHeight;
        mp_footer_h = mp_footer.clientHeight;
        mp_footer_h = 46;
        mp_pt = 35;
        mp_pb = 33;
        mp_h = winowHeight - parseInt(container_pt) - parseInt(container_pb) - parseInt(mp_pt) - parseInt(mp_pb);
        MAIN_PANEL.style.height = mp_h + "px";
        mp_menu_list.style.height = mp_h - parseInt(mp_header_h) - parseInt(mp_footer_h) - parseInt(menu_list_mb) - parseInt(menu_list_pt) + "px";
        console.log("mp_h =" + mp_h);
        console.log("mp_header_h =" + mp_header_h);
        console.log("mp_footer_h =" + mp_footer_h);
        console.log("menu_list_mb =" + menu_list_mb);
        console.log("menu_list_pt =" + menu_list_pt);
    });
} //console.log(dragName.closest('input-field__wrap'));


//var dragNamePd = dragName.style.paddingLeft;

if (isSafari) {
    //dragName.style.width = dragName.parentElement.width - dragNamePd*2;
    for (var i = 0; i < menu_list.length; i++) {
        menu_list[i].style.display = "-webkit-box";
    }

    for (var _i = 0; _i < content_in.length; _i++) {
        content_in[_i].style.display = "-webkit-box";
    }

    for (var i = 0; i < return_list_item.length; i++) {
        return_list_item[i].style.display = "-webkit-box";
    }
    if (window.innerWidth >= 1023) {
        for (var _i2 = 0; _i2 < blocks.length; _i2++) {
            blocks[_i2].style.display = "-webkit-inline-flex";
        }
        //for back-end
        for (var _i2 = 0; _i2 < blocks_wrapper.length; _i2++) {
            blocks_wrapper[_i2].style.display = "-webkit-inline-flex";
        }
        //----

        block_heads.style.display = "-webkit-inline-flex";

        for (var _i3 = 0; _i3 < inside_block.length; _i3++) {
            inside_block[_i3].style.display = "-webkit-flex";
        }

        for (var _i4 = 0; _i4 < filter.length; _i4++) {
            filter[_i4].style.height = "40px";
        }
    }

    if (window.innerWidth > 834 && window.innerWidth <= 1112) {
        for (var _i5 = 0; _i5 < blocks.length; _i5++) {
            blocks[_i5].style.display = "-webkit-inline-flex";
        }
        //for back-end
        for (var _i5 = 0; _i5 < blocks_wrapper.length; _i5++) {
            blocks_wrapper[_i5].style.display = "-webkit-inline-flex";
        }
        //----

        MAIN_PANEL.style.width = parseInt(mp_w) - 0 + "px";
        contentEl.style.width = content_w + 0 + "px";
        contentEl.style.left = parseInt(mp_left) + parseInt(mp_w) - 0 + "px";
    }

    if (window.innerWidth >= 1023 && window.innerWidth <= 912) {
        block_heads.style.display = "-webkit-inline-flex";

        for (var _i7 = 0; _i7 < inside_block.length; _i7++) {
            inside_block[_i7].style.display = "-webkit-inline-flex";
        }

        for (var _i8 = 0; _i8 < filter.length; _i8++) {
            filter[_i8].style.height = "40px";
        }
    }

    if (window.innerWidth <= 1023) {
        block_heads.style.display = "-webkit-box";
    }

    if (window.innerWidth >= 1023 && window.innerWidth <= 1300) {
        var cols = document.getElementsByClassName("col");
        for (var n = 0; n < cols.length; n++) {
            var item = cols[n];
            setWebkitFlex(item);
        }
        /*Array.from().forEach(function (item) {
            item.style.display = "-webkit-flex";
        });*/
    }

    if (window.innerWidth <= 834) {
        for (var _i9 = 0; _i9 < filter.length; _i9++) {
            filter[_i9].style.display = "-webkit-flex";
        }
    }
}

function setWebkitFlex(item) {
    item.style.display = "-webkit-flex";
}
