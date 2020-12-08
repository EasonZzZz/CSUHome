let updated = null;

// 更新窗口
function updateBlock(obj) {
    updated = obj;
    // 打开修改框架
    $('updateBlock').style.display = 'block';
    $('totalBackground').style.display = 'block';

    // 获取当前行
    let tr = obj.parentNode.parentNode;

    // 获取当前行中的所有单元格
    let tds = tr.getElementsByTagName('td');

    // 将新增框架中的输入框中内容设为当前行对应的内容
    $('id2').value = tds[2].innerText;
    $('name2').value = tds[3].innerText;
    $('dept2').value = tds[4].innerText;
    $('major2').value = tds[5].innerText;
    $('class2').value = tds[6].innerText;
    $('pwd2').value = window.atob(tds[7].innerText);
    $('phone2').value = tds[8].innerText;
}

// 提交更新
function submitUpdate() {
    let tr = updated.parentNode.parentNode;
    let tds = tr.getElementsByTagName('td');

    let user = {
        id : $('id2').value,
        name : $('name2').value,
        dept : $('dept2').value,
        major : $('major2').value,
        sClass : $('class2').value,
        pwd : window.btoa($('pwd2').value),
        phone : $('phone2').value
    };

    ajax({
        url : "./AdminServlet",
        type : "POST",
        dataType : "json",
        data : {
            method: "updateUser",
            user : JSON.stringify(user)
        },
        timeout : 10000,
        success : function (data) {
            alert("修改成功");
            tds[2].innerText = user.id;
            tds[3].innerText = user.name;
            tds[4].innerText = user.dept;
            tds[5].innerText = user.major;
            tds[6].innerText = user.sClass;
            tds[7].innerText = user.pwd;
            tds[8].innerText = user.phone;
            $('updateBlock').style.display = 'none';
            $('totalBackground').style.display = 'none';
        },
        error : function (statusText) {
            alert("系统忙，请稍后再试！");
        }
    });
}