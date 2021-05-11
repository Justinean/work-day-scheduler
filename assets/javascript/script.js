var dateTime = luxon.DateTime;
let dt = dateTime.now();
$("#currentDay").text(dt.toLocaleString(dateTime.DATETIME_FULL));
let containerEl = $(".container");
let ulEl = $("<ul>");
let liEl = [];

var leStorage = {
    "9": "",
    "10": "",
    "11": "",
    "12": "",
    "13": "",
    "14": "",
    "15": "",
    "16": "",
    "17": ""
}

if (JSON.parse(localStorage.getItem("event")) === null) {
    localStorage.setItem("event", JSON.stringify(leStorage));
} else {
    leStorage = JSON.parse(localStorage.getItem("event"));
}

for (i=0; i<=8; i++) {
    liEl.push($("<li>"));
    liEl[i].css({"list-style": "none", "display": "flex"});
    liEl[i].append($("<p>"));
    liEl[i].append($("<textarea>"));
    liEl[i].append($("<button>"));
    liEl[i].children().eq(0).text("pog");
    liEl[i].children().eq(0).text(`${(i+9).toString()}`);
    liEl[i].children().eq(2).attr("id", `${(i+9).toString()}`);
    liEl[i].children().eq(1).val(JSON.parse(localStorage.getItem("event"))[`${(i+9).toString()}`]);
    liEl[i].children().eq(0).css({"margin": "0px", "border-top": "1px solid black", "border-bottom": "1px solid black", "border-right": "2px solid black", "padding-top": "10px", "padding-right": "10px", "width": "100px", "height": "100px", "text-align": "right"});
    liEl[i].children().eq(1).css({"width": "700px", "height": "100px", "vertical-align": "top", "border": "1px solid black"});
    liEl[i].children().eq(2).css({"width": "100px", "height": "100px"});
    liEl[i].children().eq(2).text("💾");
    liEl[i].children().eq(2).addClass("saveBtn");
    ulEl.append(liEl[i]);
}
containerEl.append(ulEl);

function storeText(event) {
    let object = $(event.target);
    object.siblings().eq(1).val();
    leStorage[object.attr("id")] = object.siblings().eq(1).val();
    localStorage.setItem("event", JSON.stringify(leStorage));
}

for (i in liEl) {
    liEl[i].on("click", "button", storeText);
    if (parseInt(i) + 9 < dt.hour) {
        liEl[i].children().eq(1).css({"background-color": "red", "color": "white"});
    } else if (parseInt(i) + 9 === dt.hour) {
        liEl[i].children().eq(1).css({"background-color": "green", "color": "white"});
    } else if (parseInt(i) + 9 > dt.hour) {
        liEl[i].children().eq(1).css({"background-color": "#0084ff", "color": "black"});
    }
}
interval = setInterval(function() {
    dt = dateTime.now();
    $("#currentDay").text(dt.toLocaleString(dateTime.DATETIME_FULL));
    for (i in liEl) {
        if (parseInt(i) + 9 < dt.hour) {
            liEl[i].children().eq(1).css({"background-color": "red", "color": "white"});
        } else if (parseInt(i) + 9 === dt.hour) {
            liEl[i].children().eq(1).css({"background-color": "green", "color": "white"});
        } else if (parseInt(i) + 9 > dt.hour) {
            liEl[i].children().eq(1).css({"background-color": "#0084ff", "color": "black"});
        }
    }
}, 1000)