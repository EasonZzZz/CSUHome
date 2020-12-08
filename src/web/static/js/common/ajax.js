// ajax：options为传入的参数
function ajax(options) {
    options = options || {};
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = options.dataType || 'json';
    let params = formatParams(options.data);

    // 初始化 xhr，未考虑兼容性
    let xhr = new XMLHttpRequest();

    //启动并发送一个请求
    if (options.type === "GET") {
        xhr.open('GET', options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type === "POST") {
        xhr.open('POST', options.url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");
        xhr.send(params);
    }

    // 设置有效时间
    setTimeout(function () {
        if (xhr.readyState !== 4) {
            xhr.abort();
        }
    }, options.timeout);

    // 接收
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status;
            if ((status >= 200 && status < 300) || status === 304) {
                options.success && options.success(xhr.response === "" ? "" : JSON.parse(xhr.response));
            } else {
                options.error && options.error(xhr.statusText);
            }
        }
    }

    // 格式化 data
    function formatParams(data) {
        const arr = [];
        for (const name in data) {
            if (data.hasOwnProperty(name)){
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
        }
        arr.push(('v=' + Math.random()).replace('.',''));
        return arr.join('&');
    }
}