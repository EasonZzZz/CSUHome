// 选项卡切换
function tabSwitch() {
    let option = $("tab-title").getElementsByTagName("li");
    let content = $("tab-content").getElementsByClassName("tabbox");

    if (option.length !== content.length) {
        return;
    }

    for (let i = 0; i < option.length; i++) {
        option[i].index = i;
        option[i].onmousemove = function select() {
            for (let j = 0; j < option.length; j++) {
                option[j].className = "";
                content[j].style.display = "none";
                content[j].getElementsByTagName("canvas")[0].id = "";
            }
            this.className = "selected";
            content[this.index].style.display = "block";
        }
    }
}

// Banner 滚动
function banner() {
    const speed = 5000;
    const images = document.getElementsByClassName("banner-pic");
    const dots = $("banner-id").getElementsByTagName("li");

    // 给图片设置 img-index 属性
    for (let i = 0; i < images.length; i++) {
        images[i].setAttribute("index", i);
        dots[i].setAttribute("index", i);
    }

    const now = document.getElementById("img-now");
    let nowIndex = now.getAttribute("index");

    setInterval(changeImage, speed);

    function changeImage() {
        if (nowIndex < images.length - 1) {
            images[nowIndex].id = "";
            dots[nowIndex].id = "";
            nowIndex++;
            images[nowIndex].id = "img-now";
            dots[nowIndex].id = "dot-now";
        } else {
            images[nowIndex].id = "";
            dots[nowIndex].id = "";
            nowIndex = 0;
            images[nowIndex].id = "img-now";
            dots[nowIndex].id = "dot-now";
        }
    }

    for (let i = 0; i < images.length; i++) {
        dots[i].addEventListener("click", function() {
            let index = this.getAttribute("index");
            if (index !== nowIndex) {
                images[nowIndex].id = "";
                dots[nowIndex].id = "";
                images[index].id = "img-now";
                dots[index].id = "dot-now";
                nowIndex = index;
                clearInterval();
            }
        })
    }
}

// 错误消息显示
function errMsg(msg) {
    $("errMsg").innerHTML = msg;
    $("error").style.display = "block";
    setTimeout(function () {
        $("error").style.display = "none";
    }, 2000)
}

// 记住账号功能
function remember() {
    let loginUserId = getCookie("loginUserId");
    if (loginUserId === "null" || loginUserId === ""){
        return;
    }
    $("userId").value = loginUserId;
    $("remember").checked = true;
    $("password").focus();
}

// 读写 Cookie 的内容
function getCookie(name) {
    let arr = document.cookie.split(";");
    for (let i of arr) {
        let c = i.trim();
        if (c.indexOf(name) === 0) {
            return c.split("=")[1];
        }
    }
    return "";
}

// enter键监听
function enterListen() {
    let userId = $("userId");
    let password = $("password");
    let pwd_captcha = $("pwd-captcha");
    listen(userId, password, pwd_captcha);

    let phone = $("userPhone");
    let msg_captcha = $("msg-captcha");
    let msgCode = $("msgCode");
    listen(phone, msg_captcha, msgCode);

    function listen(input1, input2, input3) {
        input1.onkeypress = function (e) {
            if (e.key === "Enter") {
                if (input2.value.length === 0) {
                    input2.focus();
                } else if (input3.value.length === 0) {
                    input3.focus();
                } else {
                    checkLogin();
                }
            }
        }

        // 监听验证码框
        input2.onkeypress = function (e) {
            if (e.key === "Enter") {
                if (input3.value.length === 0) {
                    input3.focus();
                } else {
                    checkLogin();
                }
            }
        }

        input3.onkeypress = function (e) {
            if (e.key === "Enter") {
                checkLogin();
            }
        }
    }
}

// 关闭 Pop
function closePop(which) {
    $(which + "Pop").style.display = 'none';
}