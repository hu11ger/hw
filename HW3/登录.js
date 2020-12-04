function post_log() {
    account_number = document.getElementById('account_number').value
    pwd = document.getElementById('pwd').value
    // let baseurl=''
    let Data = {
        'account number': account_number,
        'password': pwd
    }
    let Data = JSON.stringify(Data)
    fetch(baseurl + '/session', {
        method: 'post',
        body: Data,
        headers: new Headers({ 'Content-Type': 'application/json' })
    })
        .then(response => response.json())
        .then(res => {
            if (res.status == 400) {
                document.getElementsByClassName('mesBox').innerHTML = '你输入的账号或密码错误!'
            } else {
                document.getElementsByClassName('mesBox').innerHTML = '登录成功!'
                setTimeout(function () {
                    window.location('./留言板页面.html')
                }, 1000)
            }
        })
        .catch(e => document.getElementsByClassName('mesBox').value = '注册失败！请重试！')
}