
const tableWrapper = document.querySelector('.table_wrapper');
if (tableWrapper) {
    var oldScrollTop = 0;
    var oldScrollLeft = 0;
    var instance = OverlayScrollbars(tableWrapper, {
        scrollbars: {
            autoHide: 'leave',
            autoHideDelay: 500
        }
    });
    var $table = $('#nurse_table');

    $table.floatThead({
        zIndex: 10,
        scrollContainer: function($table){
            return $table.closest('.table_container');
        }
    });
    $('table').floatThead('reflow');
}