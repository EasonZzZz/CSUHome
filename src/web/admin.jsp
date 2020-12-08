<%--
  Created by IntelliJ IDEA.
  User: EasonZz
  Date: 2020/11/17
  Time: 15:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%
    // 判断是否已登录
    if(session.getAttribute("adminName") == null){
        response.setStatus(HttpServletResponse.SC_MOVED_TEMPORARILY);
        response.setHeader("Location", "./error.jsp");
    }
%>

<html>
<head>
    <title>管理界面</title>
    <meta charset="UTF-8">
    <title>学生信息管理系统</title>
    <link rel="stylesheet" href="static/css/admin.css" type="text/css">
    <script src="static/js/admin/flip.js"></script>
    <script src="static/js/admin/main.js"></script>
    <script src="static/js/admin/add.js"></script>
    <script src="static/js/admin/del.js"></script>
    <script src="static/js/admin/update.js"></script>
    <script src="static/js/common/ajax.js"></script>
</head>
<body>
<div id="total">
    <div id="top">
        <div class="headerLine">————————————————</div>
        <div id="header">学生信息管理系统</div>
        <div class="headerLine">————————————————</div>
    </div>

    <div id="second">
        <button id="add" onclick="$('addBlock').style.display = 'block';$('totalBackground').style.display = 'block';">新增</button>
        <button id="del" onclick="delBlock()">删除</button>
    </div>

    <div id="main">
        <table id="myTable">
            <thead>
            <tr>
                <th class="col1"><input type="checkbox" onclick="selectAll(this)"/></th>
                <th class="col2">序号</th>
                <th class="col3">学号</th>
                <th class="col4">姓名</th>
                <th class="col5">学院</th>
                <th class="col6">专业</th>
                <th class="col7">班级</th>
                <th class="col8">密码</th>
                <th class="col9">手机</th>
                <th class="col10">操作</th>
            </tr>
            </thead>
            <tbody>
                <!-- 执行时会输出数据库的所有用户 -->
            </tbody>
        </table>
    </div>

    <div id="final">
        <p>第</p>
        <p id="pageNum">1</p>
        <P>页，共</P>
        <p id="nums">0</p>
        <p>条，(每页显示10条)</p>
        <button id="next" onclick="backward()">下一页</button>
        <button id="previous" onclick="forward()">上一页</button>
    </div>

</div>

<div id="totalBackground"></div>

<div id="addBlock">
    <div id="addHeader">新增学生信息</div>
    <div id="addMain">
        <table id="addMessageTable">
            <tr>
                <td class="addTableTd1">*学号</td>
                <td class="addTableTd2"><input type="text" id="id1" /></td>
            </tr>
            <tr>
                <td class="addTableTd1">*姓名</td>
                <td class="addTableTd2"><input type="text" id="name1" /></td>
            </tr>
            <tr>
                <td class="addTableTd1">学院</td>
                <td class="addTableTd2"><input type="text" id="dept1" /></td>
            </tr>
            <tr>
                <td class="addTableTd1">专业</td>
                <td class="addTableTd2"><input type="text" id="major1" /></td>
            </tr>
            <tr>
                <td class="addTableTd1">班级</td>
                <td class="addTableTd2"><input type="text" id="class1" /></td>
            </tr>
            <tr>
                <td class="addTableTd1">*密码</td>
                <td class="addTableTd2"><input type="text" id="pwd1" /></td>
            </tr>
            <tr>
                <td class="addTableTd1">*手机</td>
                <td class="addTableTd2"><input type="text" id="phone1" /></td>
            </tr>
        </table>
    </div>
    <div style="text-align: right; height: 35px; padding-top: 5px; padding-right: 20px">
        <button id="submit" onclick="submitAdd()">提交</button>
        <button id="addCancel" onclick="$('addBlock').style.display = 'none';$('totalBackground').style.display = 'none';">取消</button>
    </div>
</div>

<div id="updateBlock">
    <div id="updateHeader">修改学生信息</div>
    <div id="updateMain">
        <table id="updateMessageTable">
            <tr>
                <td class="updateTableTd1">*学号</td>
                <td class="updateTableTd2"><input type="text" id="id2" /></td>
            </tr>
            <tr>
                <td class="updateTableTd1">*姓名</td>
                <td class="updateTableTd2"><input type="text" id="name2" /></td>
            </tr>
            <tr>
                <td class="updateTableTd1">学院</td>
                <td class="updateTableTd2"><input type="text" id="dept2" /></td>
            </tr>
            <tr>
                <td class="updateTableTd1">专业</td>
                <td class="updateTableTd2"><input type="text" id="major2" /></td>
            </tr>
            <tr>
                <td class="updateTableTd1">班级</td>
                <td class="updateTableTd2"><input type="text" id="class2" /></td>
            </tr>
            <tr>
                <td class="updateTableTd1">*密码</td>
                <td class="updateTableTd2"><input type="text" id="pwd2" /></td>
            </tr>
            <tr>
                <td class="updateTableTd1">*手机</td>
                <td class="updateTableTd2"><input type="text" id="phone2" /></td>
            </tr>
        </table>
    </div>
    <div style="text-align: right; height: 35px; padding-top: 5px; padding-right: 20px">
        <button id="preservation" onclick="submitUpdate()">提交</button>
        <button id="updateCancel" onclick="$('updateBlock').style.display = 'none';$('totalBackground').style.display = 'none';">取消</button>
    </div>
</div>

<div id="examineBlock">
    <div id="examineHeader">查看学生信息</div>
    <div id="examineMain">
        <table id="examineMessageTable">
            <tr>
                <td class="examineTableTd1">学号</td>
                <td class="examineTableTd2"><input type="text" id="id3" readonly="readonly" /></td>
            </tr>
            <tr>
                <td class="examineTableTd1">姓名</td>
                <td class="examineTableTd2"><input type="text" id="name3" readonly="readonly" /></td>
            </tr>
            <tr>
                <td class="examineTableTd1">学院</td>
                <td class="examineTableTd2"><input type="text" id="dept3" readonly="readonly" /></td>
            </tr>
            <tr>
                <td class="examineTableTd1">专业</td>
                <td class="examineTableTd2"><input type="text" id="major3" readonly="readonly" /></td>
            </tr>
            <tr>
                <td class="examineTableTd1">班级</td>
                <td class="examineTableTd2"><input type="text" id="class3" readonly="readonly" /></td>
            </tr>
            <tr>
                <td class="examineTableTd1">密码</td>
                <td class="examineTableTd2"><input type="text" id="pwd3" readonly /></td>
            </tr>
            <tr>
                <td class="examineTableTd1">手机</td>
                <td class="examineTableTd2"><input type="text" id="phone3" readonly /></td>
            </tr>
        </table>
    </div>
    <div style="text-align: right; height: 35px; padding-top: 5px; padding-right: 20px">
        <button id="examineCancel" onclick="$('examineBlock').style.display = 'none';$('totalBackground').style.display = 'none';">取消</button>
    </div>
</div>

<div id="delBlock">
    <div id="delHeader">待删除的学生信息</div>
    <div id="delMain">
        <p>您确定删除以下同学的信息</p>
        <p id="delMessage"></p>
    </div>
    <div style="text-align: right; height: 35px; padding-top: 5px; padding-right: 20px">
        <button id="confirm" onclick="delConfirm()">确认</button>
        <button id="delCancel" onclick="$('delBlock').style.display = 'none';$('totalBackground').style.display = 'none';">取消</button>
    </div>
</div>
</body>
</html>
