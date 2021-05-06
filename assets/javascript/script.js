let containerEl = $(".container")
let ulEl = $("<ul>")
let liEl = []

var leStorage = {
    "9": "",
    "10": "",
    "11": "",
    "12": "",
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": ""
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
    if (i < 3) {
        liEl[i].children().eq(0).text(`${(i+9).toString()}AM`);
        liEl[i].children().eq(2).attr("id", `${(i+9).toString()}`)
        liEl[i].children().eq(1).val(JSON.parse(localStorage.getItem("event"))[`${(i+9).toString()}`])
    } else if (i === 3) {
        liEl[3].children().eq(0).text("12PM")
        liEl[i].children().eq(2).attr("id", "12")
        liEl[i].children().eq(1).val(JSON.parse(localStorage.getItem("event"))["12"])
    } else {
        liEl[i].children().eq(0).text(`${(i-3).toString()}PM`);
        liEl[i].children().eq(2).attr("id", `${(i-3).toString()}`);
        liEl[i].children().eq(1).val(JSON.parse(localStorage.getItem("event"))[`${(i-3).toString()}`])
    }
    liEl[i].children().eq(0).css({"margin": "0px", "border-top": "2px solid black", "border-right": "2px solid black", "width": "100px", "height": "100px", "text-align": "right"})
    liEl[i].children().eq(1).css({"background-color": "#dbdbdb", "width": "700px", "vertical-align": "top", "border": "1px solid black"})
    liEl[i].children().eq(2).css({"width": "100px", "height": "100px", "background-color": "aqua"})
    console.log(liEl[i])
    ulEl.append(liEl[i]);
}
containerEl.append(ulEl);

function storeText(event) {
    let object = $(event.target);
    object.siblings().eq(1).val()
    leStorage[object.attr("id")] = object.siblings().eq(1).val();
    localStorage.setItem("event", JSON.stringify(leStorage))
}

for (i in liEl) {
    liEl[i].on("click", "button", storeText);
}