function post_log() {
	account_number = document.getElementById('account_number').value;
	pwd = document.getElementById('pwd').value;
	pwdConf = documenet.getElementById('pwdConf').value;
	isRealNum(account_number);
	isRealNum(pwd);
	isCheckedPwd(pwd, pwdConf);
	// let baseurl=''
	let Data = {
		'account number': account_number,
		password: pwd,
	};
	let Data = JSON.stringify(Data);

	fetch(baseurl + '/users', {
		method: 'post',
		body: Data,
		headers: new Headers({ 'Content-Type': 'application/json' }),
	})
		.then(response => response.json())
		.then(res => {
			if (res.status == 401) {
				alert('请先微信登录!');
			} else if (res.status == 409) {
				alert('该账号已经注册!');
			} else {
				localStorage.setItem('accout_number') = res.data.account_number;
				localStorage.setItem('username') = res.data.username;
				alert('创建成功!');
				setTimeout(function () {
					window.location('./留言板页面.html');
				}, 1000);
			}
		})
		.catch(e => alert('注册失败！请重试！'));
}

function isCheckedPwd(pwd, pwdConf) {
	if (pwd == pwdConf) {
		return true;
	}
}

function isRealNum(val) {
	// isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
	if (val === '' || val == null) {
		alert('账号必须全部为数字!');
		return false;
	}
	if (!isNaN(val)) {
		return true;
	} else {
		alert('账号必须全部为数字!');
		return false;
	}
}
