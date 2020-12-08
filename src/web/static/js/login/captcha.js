// 利用 convas 来画出随机生成的字符串
// 在需要生成验证码的 convas 加上 class="captcha"
// 借鉴于：https://blog.csdn.net/weixin_41788754/article/details/82903661
function drawCaptcha() {
    let convas = document.getElementsByClassName("captcha");
    let code = "";
    let codeLength = 4;
    let selectChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C',
    'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
    'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    for (let i = 0; i < codeLength; i++) {
        let index = randomNum(0, 61);
        let char = selectChar[index];
        code += char;
    }

    for (let i = 0; i < convas.length; i++) {
        let width = convas[i].width;
        let height = convas[i].height;
        let context = convas[i].getContext("2d");
        context.textBaseline = "bottom";
        context.fillStyle = randomRGB(180,240);//填充画布颜色
        context.fillRect(0,0,width,height);//填充矩形--画画
    
        for (let j = 0; j < codeLength; j++) {
            let x = (width - 10) / codeLength * j + 10;
            let y = randomNum(height/2, height);
            let deg = randomNum(-45, 45);
    
            context.fillStyle = randomRGB(10,100);//填充随机颜色
            context.font = randomNum(15,25)+"px SimHei";//设置随机数大小，字体为SimHei
            context.translate(x,y);//将当前xy坐标作为原始坐标
            context.rotate(deg*Math.PI/180);//旋转随机角度
            context.fillText(code[j], 0,0);//绘制填色的文本
            context.rotate(-deg*Math.PI/180);
            context.translate(-x,-y);
        }
    
        for (let j = 0; j < codeLength; j++) {
            //定义笔触颜色
            context.strokeStyle = randomRGB(90,180);
            context.beginPath();
            //随机划线--4条路径
            context.moveTo(randomNum(0,width), randomNum(0,height));
            context.lineTo(randomNum(0,width), randomNum(0,height));
            context.stroke()
        }
    
        for (let i = 0; i < codeLength; i++) {
            context.fillStyle = randomRGB(0,255);
            context.beginPath();
            //随机画原，填充颜色
            context.arc(randomNum(0,width),randomNum(0,height), 1, 0, 2*Math.PI);
            context.fill();
        }
    }

    // 放入全局变量中以便验证
    window.code = code;
    
    return code;
}

function randomNum(low, up) {
	switch (arguments.length) {
        case 1:
            return parseInt((Math.random() * low + 1).toString());
        case 2:
            return parseInt(Math.random() * (up - low + 1) + low);
        default:
            return 0;
	}
}

function randomRGB(min, max) {
    let r = randomNum(min, max);
    let g = randomNum(min, max);
    let b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b +")";
}