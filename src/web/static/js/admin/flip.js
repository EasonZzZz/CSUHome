function forward() {
    let table = $("myTable");
    let pageNum = $('pageNum').innerText;
    pageNum = parseInt(pageNum);
    if (pageNum === 1) {
        window.alert('当前为第一页，无法先前翻页')
    } else if (pageNum > 1) {
        $("pageNum").innerText = pageNum - 1;
        for (let i = (pageNum - 2) * 10 + 1; i < (pageNum - 1) * 10 + 1; i++) {
            table.rows[i].style.display = 'table-row';
        }
        for (let i = (pageNum - 1) * 10 + 1; i < pageNum * 10 + 1; i++) {
            table.rows[i].style.display = 'none';
        }
    }
}

function backward() {
    let table = $("myTable");
    let pageNum = $('pageNum').innerText;
    let pageSum = Math.ceil((table.rows.length - 1) / 10);
    pageNum = parseInt(pageNum);
    if (pageNum < pageSum) {
        $('pageNum').innerText = pageNum + 1;
        for (let i = (pageNum - 1) * 10 + 1; i < pageNum * 10 + 1; i++) {
            table.rows[i].style.display = 'none';
        }
        for (let i = pageNum * 10 + 1; i < (pageNum + 1) * 10 + 1; i++) {
            table.rows[i].style.display = 'table-row';
        }
    }
    else {
        window.alert('当前为最后一页，无法向后翻页')
    }
}