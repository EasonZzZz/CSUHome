function forgetMsg(obj) {
    let forgetId = $('forgetId').value;
    let forgetPhone = $('forgetPhone').value;
    if (forgetId.length === 0) {
        errMsg("学工号不能为空！");
        return;
    } else if (!(/^1[0-9]{10}$/.test(forgetPhone))) {
        errMsg("手机号错误！");
        return;
    }
    if (captcha($('forget-captcha').value)) {
        ajax({
            url : "./ForgetServlet",
            type : "POST",
            dataType : "json",
            data : {
                method : "request",
                id : forgetId,
                phone : forgetPhone
            },
            timeout : 10000,
            success : function (data) {
                if (!data.hasOwnProperty("errorCode")) {
                    getMsgCode(obj, forgetPhone);
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
}

function nextStep() {
    if (!window.sent) {
        return;
    }
    ajax({
        url : "./ForgetServlet",
        type : "POST",
        dataType : "json",
        data : {
            method : "verify",
            msgCode : $('forget-msgCode').value
        },
        timeout : 10000,
        success : function (data) {
            if (!data.hasOwnProperty("errorCode")) {
                $('forgetId').value = "";
                $('forgetPhone').value = "";
                $('forget-captcha').value = "";
                $('forget-msgCode').value = "";
                let button = $('forget-next');
                button.innerText = '完成';
                button.onclick = changePwd;
                $('forget-table').style.display = 'none';
                $('change-table').style.display = 'inline-block';
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

function changePwd(){
    let pwd1 = $('newPwd1').value;
    let pwd2 = $('newPwd2').value;
    if (pwd1 === pwd2) {
        ajax({
            url : "./ForgetServlet",
            type : "POST",
            dataType : "json",
            data : {
                method : "change",
                newPwd : window.btoa(pwd1)
            },
            timeout : 10000,
            success : function (data) {
                if (!data.hasOwnProperty("errorCode")) {
                    alert('修改成功');
                    $('newPwd1').value = "";
                    $('newPwd2').value = "";
                    let button = $('forget-next');
                    button.innerText = '下一步';
                    button.onclick = nextStep;
                    $('forget-table').style.display = 'inline-block';
                    $('change-table').style.display = 'none';
                    $('forgetPop').style.display = 'none';
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
    } else {
        errMsg("两次输入的密码不一致");
    }
}