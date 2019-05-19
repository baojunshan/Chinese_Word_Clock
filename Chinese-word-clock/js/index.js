
// Get all columns on the page.
var numberRows = Array.from(document.getElementsByClassName('numberRow'));

// All the classes with different opacities.
var Distances = ['distance1', 'distance2', 'distance3', 'distance4'];

var numHeight = 80;

var Time =
    [
        1, 1, // 年度01
        1, 0, // 23
        1, 0, // 月份45
        1, 1, // 天67
        1, 0, // 时间89
        0, 0, // Hours.1011
        0, 0, // Minutes.1213
        0, 0  // Seconds.1415
    ];


function StartTime() {

    var tempTime = GetDate();
    console.log(tempTime)
    year = tempTime[0]
    year -= 84
    Time[0] = year%10
    Time[1] = year%12
    Time[2] = (year)%12
    Time[3] = 0
    month = tempTime[1]
    Time[4] = month
    Time[5] = 0
    day = tempTime[2]-1
    Time[6] = Math.floor(day/10)
    Time[7] = day%10

    hours = tempTime[3]
    Time[8] = Math.ceil((hours+1)/2)-1;
    Time[9] = 0;
    if (hours < 10){
        Time[10] = 0;
        Time[11] = hours;
    }else{
        Time[10] = Math.floor(hours/10);
        Time[11] = hours%10;
    }  
    minutes = tempTime[4]
    if (minutes < 10){
        Time[12] = 0;
        Time[13] = minutes;
    }else{
        Time[12] = Math.floor(minutes/10);
        Time[13] = minutes%10
    }
    seconds = tempTime[5]
    if (seconds < 10){
        Time[14] = 0;
        Time[15] = seconds;
    }else{
        Time[14] = Math.floor(seconds/10);
        Time[15] = seconds%10;
    }

    console.log(Time);

    MoveRow();
    setTimeout(StartTime, 500);
}


// Returns a array of hours, minutes, seconds.
function GetDate() {
    var newTime = new Date();
    return [newTime.getYear(), newTime.getMonth(),newTime.getDay(),newTime.getHours(), newTime.getMinutes(), newTime.getSeconds()];
}


// Moves the rows to the correct position.
function MoveRow() {
    numberRows.forEach(function (element, i) {
            var offset = -Time[i] * numHeight;

            // Move the row of numbers up/down.
            element.style.transform = 'translateY(calc(50vh + ' + offset + 'px - ' + numHeight + 'px))';

            // Change opacity of the numbers.
            Array.from(element.children).forEach(function (element2, number) {
                    element2.className = 'number ' + GetDistanceClass(Time[i], number);
                }
            );
        }
    );
}


// Returns a opacity class.
function GetDistanceClass(time, number) {

    if (time === number) return Distances[0];
    if (time === number + 1 || time === number - 1) return Distances[1];
    if (time >= number + 1 && time <= number + 4 || time >= number - 4 && time <= number - 1) return Distances[2];
    return Distances[3];
}


// Start timer when the page loads.
window.onload = StartTime();









