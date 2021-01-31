function post_log() {
    account_number = document.getElementById('account_number').value
    pwd = document.getElementById('pwd').value
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
                alert('你输入的账号或密码错误!')
            } else {
                localStorage.setItem('accout_number') = res.data.account_number
                localStorage.setItem('username') = res.data.username
                alert('登录成功')
                setTimeout(function () {
                    window.location('./主页.html')
                }, 1000)
            }
        })
        .catch(e =>{
            alert('登陆失败！请重试！')
        })
}

