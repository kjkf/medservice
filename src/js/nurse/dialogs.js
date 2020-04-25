;(function () {
    const dialogTemplElem = document.getElementById('modal-template');
    if (!dialogTemplElem) return;
    const modalTemplate = dialogTemplElem.innerHTML;
    const researchTemplate = document.getElementById('researchTable').innerHTML;
    const medicinesTemplate = document.getElementById('medicinesTable').innerHTML;
    let currentTableName = 'nurse_table';

    const openDialogButtons = document.querySelectorAll('.nurse-main .btn--table');
    openDialogButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            let template = researchTemplate;
            let id = '#research_table';

            if (btn.classList.contains('btn--purple')) {
                template = medicinesTemplate;
                id = '#medicines_table';
            }

            window.scrollTo(0, 0);
            var dialog = createDialog(template);
            dialog.open();
            const tableWrapper = dialog.container.querySelector('.table_wrapper');

            activateTableScroll(tableWrapper, id)
        })
    });

    function createDialog(dialogTempate) {
        var container = document.createElement('div');
        container.className = 'popup';
        container.innerHTML = modalTemplate;
        var overlay = container.querySelector('.overlay');
        overlay.classList.add('dialog--flex-display');
        //if (window.innerWidth <= 768) overlay.classList.add('pl30');
        var popupContainer = container.querySelector('.popup__container');
        popupContainer.innerHTML = dialogTempate;

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                document.body.removeChild(container);
            }
        });
        return {
            container: container,
            open: function open() {
                document.body.appendChild(container);
            },
            close: function close() {
                document.body.removeChild(container);
            }
        };
    }

    function activateTableScroll(tableWrapper, id) {

        if (tableWrapper) {
            var instance1 = OverlayScrollbars(tableWrapper, {
                scrollbars: {
                    autoHide: 'leave',
                    autoHideDelay: 500
                }
            });
            $(id).floatThead({
                scrollContainer: function($table){
                    console.log($table);
                    return $table.closest('.table-responsive');
                }
            });

            $('table').floatThead('reflow');
        }
    }
})();