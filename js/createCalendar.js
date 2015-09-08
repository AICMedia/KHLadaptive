function createCalendar(id, year, month) {
    var elem = document.getElementById(id);

    var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    var d = new Date(year, mon);
    var today = new Date();
    var monthArr = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

    var table = '<h4 class="b-calendar__item-month">'+ monthArr[d.getMonth()] + ' ' + year +'</h4><table class="b-calendar__item-table"><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    // заполнить первый ряд от понедельника
    // и до дня, с которого начинается месяц
    // * * * | 1  2  3  4
    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    // ячейки календаря с датами
    while (d.getMonth() == mon) {
        if (d.getMonth() == today.getMonth() && d.getDate() == today.getDate()) {
            table += '<td class="day today">' + d.getDate() + '</td>';
        } else {
            table += '<td class="day">' + d.getDate() + '</td>';
        };

        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    if (getDay(d) != 0) {
        for (var i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    table += '</tr></table>';

    elem.innerHTML = table;
}

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

for (var i = 1; i <= 12; i++) {
    document.getElementById('calendar').innerHTML += '<div id="month-'+ i +'"></div>';
    createCalendar("month-" + i, 2015, i);
}


// Тестовый контент заблокированных дней
var disableArr = [[0,2],[7,1],[7,2],[7,3],[7,7],[7,9],[7,11],[8,15]];

for (var i = 0; i < disableArr.length; i++) {
    var elem = document.getElementById('month-' + (disableArr[i][0] + 1));
    var collect = elem.querySelectorAll('.day');

    collect[disableArr[i][1]].classList.add('disable');
}