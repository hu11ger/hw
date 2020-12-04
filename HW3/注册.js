function post_log() {
    account_number = document.getElementById('account_number').value
    pwd = document.getElementById('pwd').value
    isRealNum(account_number)
    // let baseurl=''
    let Data = {
        'account number': account_number,
        'password': pwd
    }
    let Data = JSON.stringify(Data)
    fetch(baseurl + '/users', {
        method: 'post',
        body: Data,
        headers: new Headers({ 'Content-Type': 'application/json' })
    })
        .then(response => response.json())
        .then(res => {
            if (res.status == 401) {
                document.getElementsByClassName('mesBox').innerHTML = '请先微信登录!'
            } else if (res.status == 409) {
                document.getElementsByClassName('mesBox').innerHTML = '该账号已经注册!'
            } else {
                document.getElementsByClassName('mesBox').innerHTML = '创建成功!'
                setTimeout(function () {
                    window.location('./留言板页面.html')
                }, 1000)
            }
        })
        .catch(e => document.getElementsByClassName('mesBox').value = '注册失败！请重试！')
}

function isRealNum(val) {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除 
    if (val === "" || val == null) {
        document.getElementsByClassName('mesBox').innerHTML = '账号必须全部为数字!'
        return false;
    }
    if (!isNaN(val)) {
        return true;
    } else {
        document.getElementsByClassName('mesBox').innerHTML = '账号必须全部为数字!'
        return false;
    }
}
