<%--
  Created by IntelliJ IDEA.
  User: EasonZz
  Date: 2020/11/17
  Time: 15:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewpoint" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="中南大学">
    <meta name="description" content="中南大学信息门户">
    <meta name="author" content="Eason0">
    <title>未经授权的访问</title>

    <link rel="stylesheet" href="static/css/reset.css">
    <style>
        .box {
            width: 60%;
            height: 400px;
            background: AntiqueWhite;
            text-align: center;
            margin-left: 20%;
            margin-top: 10%;
        }
        .msg {
            font-size: 24px;
            background: Tan;
            line-height: 75px;
        }
        .msg .userId {
            display: inline-block;
            font-style: italic;
            font-weight: bolder;
        }
        .jump {
            margin-top: 75px;
            height: 30%;
            line-height: 100px;
            font-size: 20px;
            color: DodgerBlue;
        }
        .jump #second {
            font-style: italic;
            font-weight: bold;
        }
    </style>
</head>

<body>
<div class="box">
    <div class="msg">
        未经授权的访问
    </div>
    <div class="jump"><a href='./index.html'><span id="second">3</span>&nbsp;秒后自动跳转</a></div>
</div>

<script>
    let second = document.getElementById("second");
    let count = 3;
    let speed = 1000;

    timing();

    function timing() {
        second.innerHTML = count.toString();
        if (count <= 0) {
            window.location.href = "./index.html"
        } else {
            count--;
            setTimeout(timing, speed);
        }
    }
</script>
</body>
</html>