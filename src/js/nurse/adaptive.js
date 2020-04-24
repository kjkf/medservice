
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