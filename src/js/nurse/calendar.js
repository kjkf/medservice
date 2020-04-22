;(function () {
  const elem = document.getElementById('calendar_input');

  if (!elem) return;
  const picker = datepicker('#calendar_input', {
    onSelect: (instance, date) => {

    },
    formatter: (input, date, instance) => {
      // меняет формат даты на дд.мм.гггг
      let d = new Date();
      let dd = date.getDate()<=9 ? '0'+(date.getDate()):(date.getDate());
      let mm = date.getMonth()<9?'0'+(date.getMonth() + 1):date.getMonth() + 1  ; //Months are zero based
      let yyyy = date.getFullYear();
      input.value = dd+'.'+mm+'.'+yyyy
    },
    startDay: 1,
    customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    customOverlayMonths:['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'],
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
})();
