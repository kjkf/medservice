;(function () {
    const elem = document.getElementById('calendar_input');
    const month_list = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    if (!elem) return;
    const picker = datepicker('#calendar_input', {
        onSelect: (instance, date) => {

        },
        onShow: instance => {
            setTimeout(() => {
                elem.scrollIntoView(true);
            }, 0)
        },
        formatter: (input, date, instance) => {
            // меняет формат даты на дд.мм.гггг
            let d = new Date();
            let dd = date.getDate();
            let mm = date.getMonth();//<9?'0'+(date.getMonth() + 1):date.getMonth() + 1  ; //Months are zero based
            let yyyy = date.getFullYear();
            console.log("month_list[mm]=" + month_list[mm]);
            console.log("mm = " + mm);
            input.value = dd + ' ' + month_list[mm] + ' ' + yyyy
        },
        startDay: 1,
        customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        customOverlayMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'],
        showAllDates: true,
        overlayButton: 'Готово',
        overlayPlaceholder: 'Введите год'
    });

    let btn = document.getElementById("calendar_btn");

    btn.addEventListener('click', e => {
        e.stopPropagation();
        const isHidden = picker.calendarContainer.classList.contains('qs-hidden');
        picker[isHidden ? 'show' : 'hide']()
    });

    const btnsArrow = document.querySelectorAll('.schedule__month .btn-arrow--dark');
    const monthNameSpan = document.querySelector('.schedule__month .btn-lr__name .btn-lr-m');
    const _month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let monthIndex = new Date().getMonth();
    monthNameSpan.innerHTML = _month[monthIndex];

    btnsArrow.forEach(btn => {
        btn.addEventListener('click', e => {
            let idx = monthIndex;
            if (btn.classList.contains('left')) {
                monthIndex = monthIndex === 0 ? 11 : monthIndex - 1;
            } else {
                monthIndex = monthIndex === 11 ? 0 : monthIndex + 1;
            }

            monthNameSpan.innerHTML = _month[monthIndex];
        });
    })
})();
