// 提交新增
function submitAdd() {
    let id = $('id1').value;
    let name = $('name1').value;
    let dept = $('dept1').value;
    let major = $('major1').value;
    let sClass = $('class1').value;
    let pwd = $('pwd1').value;
    let phone = $('phone1').value;
    if (id === ""|| name === "" || pwd === "" || phone === ""){
        alert("缺少必填字段")
        return;
    }

    $('addBlock').style.display = 'none';
    $('totalBackground').style.display = 'none';

    let user = {
        "id" : id,
        "name" : name,
        "dept" : dept,
        "major" : major,
        "sClass" : sClass,
        "pwd" : window.btoa(pwd),
        "phone" : phone,
    };

    addUserToDB(user);

    $('id1').value = null;
    $('name1').value = null;
    $('dept1').value = null;
    $('major1').value = null;
    $('class1').value = null;
    $('pwd1').value = null;
    $('phone1').value = null;
}

// 将用户添加提交到数据库
function addUserToDB(user) {
    ajax({
        url : "./AdminServlet",
        type : "POST",
        dataType : "json",
        data : {
            method: "addUser",
            user : JSON.stringify(user)
        },
        timeout : 10000,
        success : function (data) {
            addUserToView(user);
            alert("添加成功");
        },
        error : function (statusText) {
            alert("系统忙，请稍后再试！");
        }
    });
}

// 将用户插入前端界面
// 创建一个新的tr
function addUserToView(user) {
    let table = $("myTable");
    let nums = table.rows.length;
    let tr = document.createElement('tr');
    // 隔行换色
    tr.className = nums % 2 !== 0 ? 'mainTbodyTr1' : 'mainTbodyTr2'
    table.append(tr);

    let sel = document.createElement('input');
    sel.setAttribute('type','checkbox');
    sel.setAttribute('name','item');
    // 创建单元格td，并添加属性、内容
    let td1 = document.createElement('td');
    td1.className = "col1";
    td1.appendChild(sel);
    let td2 = document.createElement('td');
    td2.className = "col2";
    td2.appendChild(document.createTextNode(nums));
    let td3 = document.createElement('td');
    td3.className = "col3";
    td3.appendChild(document.createTextNode(user.id));
    let td4 = document.createElement('td');
    td4.className = "col4";
    td4.appendChild(document.createTextNode(user.name));
    let td5 = document.createElement('td');
    td5.className = "col5";
    td5.appendChild(document.createTextNode(user.dept));
    let td6 = document.createElement('td');
    td6.className = "col6";
    td6.appendChild(document.createTextNode(user.major));
    let td7 = document.createElement('td');
    td7.className = "col7";
    td7.appendChild(document.createTextNode(user.sClass));
    let td8 = document.createElement('td');
    td8.className = "col8";
    td8.appendChild(document.createTextNode(user.pwd));
    let td9 = document.createElement('td');
    td9.className = "col9";
    td9.appendChild(document.createTextNode(user.phone));
    let td10 = document.createElement('td');
    td10.className = "col10";
    let examine = document.createElement('input');
    examine.id = 'examine';
    examine.setAttribute('type','button');
    examine.setAttribute('value','查看');
    examine.setAttribute('onclick','examineBlock(this)');
    let update = document.createElement('input');
    update.id = 'update';
    update.setAttribute('type','button');
    update.setAttribute('value','修改');
    update.setAttribute('onclick','updateBlock(this)');
    td10.appendChild(examine);
    td10.appendChild(update);

    // 将单元格添加到行
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);
    tr.appendChild(td10);

    $('nums').innerText = nums;
    let pageNum = $('pageNum').innerText;
    pageNum = parseInt(pageNum);
    for (let i = 10 * pageNum + 1; i <= nums; i++) {
        table.rows[i].style.display = 'none';
    }
}