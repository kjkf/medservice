function replaceColgroup(table, cols) {
    let colgroup = table.querySelectorAll('col');
    console.log(colgroup);
    colgroup.forEach((col, i) => {
        console.log(col);
        console.log(col.getAttribute('width'));
        col.style.width = `${cols[i]}px`;
        col.setAttribute('width', `${cols[i]}px`)
    });
}

let tabletCols = [];

let table = document.querySelector('table');
console.log(table);
replaceColgroup(table, [100, 30, 50, 30, 30]);

const tableWrapper = document.querySelector('.table_container');
if (tableWrapper) {
    var oldScrollTop = 0;
    var oldScrollLeft = 0;
    var instance = OverlayScrollbars(tableWrapper, {
        scrollbars: {
            autoHide: 'never',
            autoHideDelay: 3000
        }
    });
    var $table = $('#nurse_table');

    $table.floatThead({
        zIndex: 100,
        scrollContainer: function($table){
            return $table.closest('.table_container');
        }
    });
    $('table').floatThead('reflow');
}