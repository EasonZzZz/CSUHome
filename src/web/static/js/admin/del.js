// 删除弹窗
function delBlock() {
    $('delBlock').style.display = 'block';
    $('totalBackground').style.display = 'block';

    let items = document.getElementsByName('item');
    let msg = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].checked) {
            let m = items[i].parentNode.parentNode.cells[3].innerText;
            msg.push(m);
        }
    }

    let delMsg = $('delMessage');
    delMsg.innerText = msg.join("\t");
}

// 删除确认
function delConfirm() {
    let items = document.getElementsByName('item');
    let itemsNum = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i].checked) {
            itemsNum++;
            delUser(items[i].parentElement.parentElement.getElementsByClassName('col3')[0].innerHTML);
            items[i].parentNode.parentNode.remove();
            i--;
        }
    }
}

// 将用户删除
function delUser(id) {
    ajax({
        url : "./AdminServlet",
        type : "POST",
        dataType : "json",
        data : {
            method: "delUser",
            id : encodeURIComponent(id)
        },
        timeout : 10000,
        success : function (data) {
            $('delBlock').style.display = 'none';
            $('totalBackground').style.display = 'none';
            alert("删除 " + id + " 成功！");
            updateList();
        },
        error : function (statusText) {
            alert("系统忙，请稍后再试！");
        }
    });
}

// 界面相关设置
function updateList() {
    let table = $("myTable");
    let trs = table.getElementsByTagName("tr");
    for (let i=1; i<trs.length; i++) {
        trs[i].className = i % 2 !== 0 ? 'mainTbodyTr1' : 'mainTbodyTr2'
        let sort = trs[i].getElementsByTagName('td')[1];
        sort.innerText = i;
    }
    let nums = trs.length - 1;
    $('nums').innerText = nums.toString();
    nums = parseInt(nums.toString());
    let pageSum = Math.ceil(nums / 10);
    let pageNum = $('pageNum').innerText;
    pageNum = parseInt(pageNum);

    if (pageNum <= pageSum) {
        for (let i = (pageNum - 1) * 10 + 1; i < pageNum * 10 + 1 && i < items.length; i++) {
            table.rows[i].style.display = 'table-row';
        }
        for (let i = 1; i < (pageNum - 1) * 10 + 1 && i < items.length; i++) {
            table.rows[i].style.display = 'none';
        }
        for (let i = pageNum * 10 + 1; i < nums + 1 && i < items.length; i++) {
            table.rows[i].style.display = 'none';
        }
    }
    if (pageNum > pageSum) {
        for (let i = (pageNum - 2) * 10 + 1; i < nums + 1 && i < items.length; i++) {
            table.rows[i].style.display = 'table-row';
        }
        for (let i = 1; i < (pageNum - 2) * 10 + 1 && i < items.length; i++) {
            table.rows[i].style.display = 'none';
        }
        $('pageNum').innerText = pageNum - 1;
    }
}