function $(id) {
    return typeof id == "string" ? document.getElementById(id) : id;
}

// 全选
function selectAll(obj) {
    let status = obj.checked;
    let items = document.getElementsByName('item');
    let pageNum = $('pageNum').innerText;
    pageNum = parseInt(pageNum);
    for (let i = (pageNum - 1) * 10; i < pageNum * 10 && i < items.length; i++) {
        items[i].checked = status;
    }
}

// 获得所有用户信息
function getAllUser() {
    ajax({
        url : "./AdminServlet",
        type : "POST",
        dataType : "json",
        data : {
            method: "getAll"
        },
        timeout : 10000,
        success : function (data) {
            for (let i = 0; i < data.length; i++) {
                let user = JSON.parse(data[i]);
                addUserToView(user);
            }
        },
        error : function (statusText) {
            alert("系统忙，请稍后再试！");
        }
    });
}

// 查看窗口
function examineBlock(obj) {
    $('examineBlock').style.display = 'block';
    $('totalBackground').style.display = 'block';
    let tr = obj.parentNode.parentNode;
    let tds = tr.getElementsByTagName('td');

    $('id3').value = tds[2].innerText;
    $('name3').value = tds[3].innerText;
    $('dept3').value = tds[4].innerText;
    $('major3').value = tds[5].innerText;
    $('class3').value = tds[6].innerText;
    $('pwd3').value = window.atob(tds[7].innerText);
    $('phone3').value = tds[8].innerText;
}

window.onload = function () {
    getAllUser();
}