function $(id) {
    return typeof id == "string" ? document.getElementById(id) : id;
}

window.onload = function() {
    tabSwitch();
    drawCaptcha();
    banner();
    remember();
    enterListen();
}