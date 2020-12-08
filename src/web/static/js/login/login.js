// 登录验证
function checkLogin() {
    if ($("loginByPwd").className.indexOf("selected") >= 0) {
        let userId = $("userId").value;
        let pwd = $("password").value;
        if (userId.length === 0) {
            errMsg("学工号不能为空！");
            return;
        } else if (pwd.length === 0) {
            errMsg("密码不能为空！");
            return;
        }
        if (captcha($("pwd-captcha").value)) {
            loginByPwd(userId, pwd);
        }
    } else {
        let phone = ($("userPhone").value).trim();
        let msgCode = ($("msgCode").value).trim();
        if (!(/^1[0-9]{10}$/.test(phone))) {
            errMsg("手机号错误！");
            return;
        } else if (!window.sent){
            errMsg("短信验证码未发送！")
            return;
        } else if ($("msgCode").value.length === 0) {
            errMsg("短信验证码不能为空！")
            return;
        }
        if (captcha($("msg-captcha").value)) {
            loginByMsgCode(phone, msgCode);
        }
    }
}

// 判断图形验证码是否正确
function captcha(code) {
    if (code.length === 0) {
        errMsg("验证码不能为空！");
        return false;
    } else if (code.toLocaleLowerCase() !== window.code.toLocaleLowerCase()) {
        errMsg("验证码错误！");
        drawCaptcha();
        return false;
    }
    return true;
}

// 密码登录
function loginByPwd(userId, pwd)  {
    userId = encodeURIComponent(userId);
    // 进行 base64 加密，增加安全性
    pwd = window.btoa(encodeURIComponent(pwd));

    ajax({
        url : "./PwdServlet",
        type : "POST",
        dataType : "json",
        data : {
            userId : userId,
            pwd : pwd
        },
        timeout : 10000,
        success : function (data) {
            if (!data.hasOwnProperty("errorCode")) {
                // 是否记住密码
                if ($("remember").checked === true) {
                    let date = new Date();
                    date.setTime(date.getTime() + (3*24*60*60*1000));
                    document.cookie = "loginUserId=" + userId + ";expires=" + date + ";path=/";
                } else {
                    document.cookie = "loginUserId=" + ";path=/";
                }

                window.location.href="./login.jsp";
            } else {
                drawCaptcha();
                errMsg("错误：【" + data.errorCode + "】" + data.errorMsg);
            }
        },
        error : function (statusText) {
            drawCaptcha();
            errMsg("系统忙，请稍后再试！");
        }
    });
}

// 获取验证码
function getMsgCode(obj, phone) {
    if (!(/^1[0-9]{10}$/.test(phone))) {
        errMsg("手机号错误！");
        return;
    }

    let getMsgCode = obj;
    let waitTime = 60;

    ajax({
        url : "./MsgCodeServlet",
        type : "POST",
        dataType : "json",
        data : {
            phone : phone
        },
        timeout : 10000,
        success : function (data) {
            if (!data.hasOwnProperty("errorCode")) {
                window.sent = true;
                time();
            } else {
                drawCaptcha();
                errMsg("错误：【" + data.errorCode + "】" + data.errorMsg);
            }
        },
        error : function (statusText) {
            drawCaptcha();
            errMsg("系统忙，请稍后再试！");
        }
    });

    // 计时器，60s后重新发送
    function time() {
        if (waitTime === 0) {
            getMsgCode.disabled = false;
            getMsgCode.setAttribute("onclick", "getMsgCode()");
            getMsgCode.innerHTML = "获取验证码";
            waitTime = 60;
        } else {
            getMsgCode.disabled = true;
            getMsgCode.removeAttribute("onclick");
            getMsgCode.innerHTML = waitTime + "s";
            waitTime--;
            setTimeout(function () {
                time();
            }, 1000);
        }
    }
}

// 手机号码登录
function loginByMsgCode(phone, msgCode) {
    phone = encodeURIComponent(phone);
    msgCode = encodeURIComponent(msgCode);

    ajax({
        url : "./PhoneServlet",
        type : "POST",
        dataType : "json",
        data : {
            phone : phone,
            msgCode : msgCode
        },
        timeout : 10000,
        success : function (data) {

        },
        error : function (statusText) {
            drawCaptcha();
            errMsg("系统忙，请稍后再试！");
        }
    });
}

// 管理员登录
function adminLogin() {
    let adminId = $("adminId").value;
    let adminPwd = $("adminPwd").value;

    if (adminId.length === 0 || adminPwd.length ===0) {
        errMsg("密码、账号均不能为空");
        return;
    }

    adminId = encodeURIComponent(adminId);
    adminPwd = window.btoa(encodeURIComponent(adminPwd));

    ajax({
        url : "./AdminServlet",
        type : "POST",
        dataType : "json",
        data : {
            method : 'login',
            adminId : adminId,
            adminPwd : adminPwd
        },
        timeout : 10000,
        success : function (data) {
            if (!data.hasOwnProperty("errorCode")) {
                window.location.href="./admin.jsp";
            } else {
                drawCaptcha();
                errMsg("错误：【" + data.errorCode + "】" + data.errorMsg);
            }
        },
        error : function (statusText) {
            errMsg("系统忙，请稍后再试！");
        }
    });
}