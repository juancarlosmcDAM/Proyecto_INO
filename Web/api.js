function loadChart() {
    const fecha = [], temperatura = [];

    const requestURL = 'https://zen-spence.82-223-165-194.plesk.page/API_2/get.php';
    const request = new XMLHttpRequest({ mozSystem: true }); // create http request
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            const data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                fecha.push(data[i].hora);
                temperatura.push(data[i].temp);       
            }
            //dspChrt(fecha, temperatura);
            //console.log(temperatura);
        }
    }
    request.open('GET', requestURL);
    request.send(); // send the request
}
loadChart();

////////////////////////////////////

function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

////////////Filtra por HORA////////////
function time() {
    var date = new Date();

    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    
    if(hh < 10){
        var time = '0' + String(hh) + ":" + String(mm) + ":" + String(ss);
        var timeMinimo = '0' + String(hh-1) + ":" + String(mm) + ":" + String(ss);
    }else{
        var time = String(hh) + ":" + String(mm) + ":" + String(ss);
        var timeMinimo = String(hh-1) + ":" + String(mm) + ":" + String(ss);
    }

    // adding 0 for single digits
    
    mm = checkTime(mm);
    ss = checkTime(ss);
    //console.log(hh + ":" + mm + ":" + ss) ;
    var now = moment().format('DD/MM/YYYY HH:mm');
    var now7 = moment().subtract(7, 'days').format('DD/MM/YYYY HH:mm');

    //console.log(time, timeMinimo, "Moment ficha " + now7);
    loadTime(time, timeMinimo);
}
///////////////////////////////////////
function loadTime(time, timeMinimo) {
    const hora = [], temperatura2 = [];

    const requestURL = 'https://zen-spence.82-223-165-194.plesk.page/API_2/get1H.php';
    const request = new XMLHttpRequest({ mozSystem: true }); // create http request
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            const data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                // if(data[i].tiempo > time){
                //     fecha2.push(data[i].tiempo);
                //     temperatura2.push(data[i].temp);
                // }
                if(data[i].hora >= timeMinimo && data[i].hora <= time){
                    hora.push(data[i].hora);
                    temperatura2.push(data[i].temp);
                }
            }
            dspChrt(hora,temperatura2);
            console.log(hora, temperatura2);

        }
    }
    request.open('GET', requestURL);
    request.send(); // send the request
}
loadTime();

function dia() {
    var date = new Date();
    var day = date.getDate();
    var mes = date.getUTCMonth();
    var anyo = date.getUTCFullYear();

    if(day < 10){
        var dateToday = String(anyo)  + String(mes+1) + "-" + '0' + String(day);
        var dateYesterday = String(anyo) + "-" + '0' + String(mes+1) + "-" + String(day-1);
    }else{
        var dateToday = String(anyo) + "-" + String(mes+1) + "-" + String(day);
        var dateYesterday = String(anyo) + "-" + String(mes+1) + "-" + String(day-1);
    }

    if(mes < 10){
        var dateToday = String(anyo) + "-" + '0' + String(mes+1) + "-" + String(day);
        var dateYesterday = String(anyo) + "-" + '0' + String(mes+1) + "-" + String(day-1);
    }else{
        var dateToday = String(anyo) + "-" + String(mes+1) + "-" + String(day);
        var dateYesterday = String(anyo) + "-" + String(mes+1) + "-" + String(day-1);
    }

    //console.log(hh + ":" + mm + ":" + ss) ;


    var fechaHoy = new Date(anyo, mes, day);

    console.log("Fecha Hoy: " + dateToday + " ----- Fecha ayer: " + dateYesterday);
    load24H(dateToday,dateYesterday)
}

function load24H(dateToday , dateYesterday) {
    const fecha2 = [], temperatura2 = [], hora2 = [];
    const requestURL = 'https://zen-spence.82-223-165-194.plesk.page/API_2/getLast24H.php';
    const request = new XMLHttpRequest({ mozSystem: true }); // create http request
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            const data = JSON.parse(request.responseText);
			//const data = request.responseText;
            var startDate = '2021-05-18';
            var endDate = '13:00:00';
            for (let i = 0; i < data.length; i++) {
                if((data[i].hora > '00:00:00' && data[i].hora < '00:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '01:00:00' && data[i].hora < '01:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '02:00:00' && data[i].hora < '02:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '03:00:00' && data[i].hora < '03:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '04:00:00' && data[i].hora < '04:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '05:00:00' && data[i].hora < '05:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '07:00:00' && data[i].hora < '07:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '08:00:00' && data[i].hora < '08:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '09:00:00' && data[i].hora < '09:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '10:00:00' && data[i].hora < '10:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '11:00:00' && data[i].hora < '11:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '12:00:00' && data[i].hora < '12:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '13:00:00' && data[i].hora < '13:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '14:00:00' && data[i].hora < '14:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '15:00:00' && data[i].hora < '15:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '16:00:00' && data[i].hora < '16:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '17:00:00' && data[i].hora < '17:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '18:00:00' && data[i].hora < '18:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '19:00:00' && data[i].hora < '19:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '20:00:00' && data[i].hora < '20:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '21:00:00' && data[i].hora < '21:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '22:00:00' && data[i].hora < '22:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                if((data[i].hora > '23:00:00' && data[i].hora < '23:00:59') ){
                    hora2.push(data[i].hora);
                    fecha2.push(data[i].fecha);
                    temperatura2.push(data[i].temp);
                }
                // hora2.push(data[i].hora);
                // fecha2.push(data[i].fecha);
                // temperatura2.push(data[i].temp);
            }
            dspChrt(hora2,temperatura2)
            console.log(temperatura2, fecha2 , hora2);
        }
    }
    request.open('GET', requestURL);
    request.send(); // send the request
}
load24H();

window.onload = function defaultLoad() {
    var date = new Date();
    var day = date.getDate();
    var mes = date.getUTCMonth();
    var anyo = date.getUTCFullYear();

    if(mes < 10){
        var dateToday = String(anyo) + "-" + '0' + String(mes+1) + "-" + String(day);
        var dateYesterday = String(anyo) + "-" + '0' + String(mes+1) + "-" + String(day-1);
    }else{
        var dateToday = String(anyo) + "-" + String(mes+1) + "-" + String(day);
        var dateYesterday = String(anyo) + "-" + String(mes+1) + "-" + String(day-1);
    }

    //console.log(hh + ":" + mm + ":" + ss) ;

    var fechaHoy = moment(dateToday, "YYYY-MM-DD"); // 1st argument - string, 2nd argument - format
    var dateObject = fechaHoy.toDate(); // convert moment.js object to Date object
    
    var dateObjectString = dateObject.toString();
    var dateFrom = moment(fechaHoy).subtract(1,'months').endOf('months').format('YYYY-MM-DD');

    //var fechaHoy = Date.parse(dateToday);

    console.log("Mes ACTUAL: " + (1 + fechaHoy.month()) + "-----" + fechaHoy.format("YYYY-MM-DD") + "----Mes anterior -> " + dateFrom);
    loadMes(dateToday,dateFrom)
}

function mes() {
    var date = new Date();
    var day = date.getDate();
    var mes = date.getUTCMonth();
    var anyo = date.getUTCFullYear();

    if(mes < 10){
        var dateToday = String(anyo) + "-" + '0' + String(mes+1) + "-" + String(day);
        var dateYesterday = String(anyo) + "-" + '0' + String(mes+1) + "-" + String(day-1);
    }else{
        var dateToday = String(anyo) + "-" + String(mes+1) + "-" + String(day);
        var dateYesterday = String(anyo) + "-" + String(mes+1) + "-" + String(day-1);
    }

    var fechaHoy = moment(dateToday, "YYYY-MM-DD"); // 1st argument - string, 2nd argument - format
    var dateObject = fechaHoy.toDate(); // convert moment.js object to Date object
    
    var dateObjectString = dateObject.toString();
    var dateFrom = moment(fechaHoy).subtract(1,'months').endOf('months').format('YYYY-MM-DD');


    //console.log("Mes ACTUAL: " + (1 + fechaHoy.month()) + "-----" + fechaHoy.format("YYYY-MM-DD") + "----Mes anterior -> " + dateFrom);
    loadMes(dateToday,dateFrom)
}

function loadMes(dateToday,dateFrom) {
    const fecha = [], temperatura = [], tiempo = [], id = [];

    const requestURL = 'https://zen-spence.82-223-165-194.plesk.page/API_2/getMonth.php';
    const request = new XMLHttpRequest({ mozSystem: true }); // create http request
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            const data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                //if(/*(data[i].fecha == dateToday || data[i].fecha > dateFrom) &&*/ (data[i].tiempo >= '12:00:00' && data[i].tiempo <= '12:00:59') ){
                //if(data[i].tiempo >= '12:00:00' && data[i].tiempo <= '12:00:59'){
                    fecha.push(data[i].fecha);
                    //console.log("Item nº " + i + "Fecha de hoy -> "+ data[i].fecha);
                    temperatura.push(data[i].temp);       
                    tiempo.push(data[i].hora);    
                //}
                //}
                //console.log("Fecha -->>" + fecha[i]);
            }
            dspChrt(fecha, temperatura);
            console.log( fecha,tiempo);
        }
    }
    request.open('GET', requestURL);
    request.send(); // send the request
}

function year() {
    var date = new Date();
    var day = date.getDate();
    var mes = date.getUTCMonth();
    var anyo = date.getUTCFullYear();

    if(mes < 10){
        var dateToday = String(anyo) + "-" + '0' + String(mes+1) + "-" + String(day);
        var dateYesterday = String(anyo) + "-" + '0' + String(mes+1) + "-" + String(day-1);
    }else{
        var dateToday = String(anyo) + "-" + String(mes+1) + "-" + String(day);
        var dateYesterday = String(anyo) + "-" + String(mes+1) + "-" + String(day-1);
    }

    var fechaHoy = moment(dateToday, "YYYY-MM-DD"); // 1st argument - string, 2nd argument - format
    var dateObject = fechaHoy.toDate(); // convert moment.js object to Date object
    
    var dateObjectString = dateObject.toString();
    var dateFrom = moment(fechaHoy).subtract(1,'years').endOf('year').format('YYYY-MM-DD');


    console.log("Mes ACTUAL: " + /*(1 + fechaHoy.month()) +*/ "-----" + fechaHoy.format("YYYY-MM-DD") + "----Mes anterior -> " + dateFrom);
    //loadMes(dateToday,dateFrom)
}

function loadYear(dateToday,dateFrom) {
    const fecha = [], temperatura = [], hora1 = [], id = [];

    const requestURL = 'https://zen-spence.82-223-165-194.plesk.page/API_2/getYear.php';
    const request = new XMLHttpRequest({ mozSystem: true }); // create http request
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            const data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                //if(/*(data[i].fecha == dateToday || data[i].fecha > dateFrom) &&*/ (data[i].tiempo >= '12:00:00' && data[i].tiempo <= '12:00:59') ){
                if(data[i].hora >= '12:00:00' && data[i].hora <= '12:00:59'){
                    fecha.push(data[i].fecha);
                    //console.log("Item nº " + i + "Fecha de hoy -> "+ data[i].fecha);
                    temperatura.push(data[i].temp);       
                    hora1.push(data[i].hora);    
                }
                //}
                //console.log("Fecha -->>" + fecha[i]);
            }
            dspChrt(fecha, temperatura);
            console.log( fecha,hora1);
        }
    }
    request.open('GET', requestURL);
    request.send(); // send the request
}

function dspChrt(fecha2, temperatura2) {

    const ctx =
        document.getElementById('grafico').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fecha2,
            datasets: [{
                label: 'Temperatura',
                data: temperatura2, // json value received used in method
                backgroundColor: ["rgba(96, 146, 164, 0.9)"],
                borderColor: ["#115973"],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            tension: 0.5,
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 50,
                        stepSize: 5,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperatura (℃)'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Fecha'
                    }
                }]
            }
        }
    });
}