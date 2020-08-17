'use strict';

var citySelected = document.getElementById("city-select");

document.getElementById("city-select").onchange = function() {
    ajaxRequest(citySelected.value);
}

window.onload = function() {
    ajaxRequest(citySelected.value);
};

function ajaxRequest(city) {
    const appid = '4b5774e9f3d2a07b84f0f2f88e486224';
    const lang = 'ja';
    const units = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&lang=${lang}&units=${units}`;

    $.ajax(url)
    .then(function(data){
        const city = data.name;
        const date = new Date(toJSTime(data.dt));
        const myMonth = date.getMonth() + 1;
        const myDate = date.getDate();
        const theWeek = ["日", "月", "火", "水", "木", "金", "土"];
        const numDay = date.getDay();
        const myWeek = theWeek[numDay];
        const myHours = date.getHours();
        const myMin = String(date.getMinutes()).padStart(2, '0');
        const desc = data.weather[0].description;
        const temp = Math.round(data.main.temp * 10) / 10;
        const windspeed = data.wind.speed;

        $('#city').html(city);
        $('#date-1').html(myMonth + '月' + myDate + '日' + '(' + myWeek + ')');
        $('#date-2').html(myHours + '時' + myMin + '分');
        $('#desc').html(desc);
        $('#temp').html(temp);
        $('#windspeed').html(windspeed);
    })
}

function toJSTime(utcTime) {
    return utcTime * 1000;
}
