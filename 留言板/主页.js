// 显示留言
window.onload = displayMsg();
function displayMsg() {
	fetch(baseurl, {
		method: 'get',
	})
		.then(response => response.json())
		// 以列表形式显示
		.then(data => {
			let m = 0;
			for (item in data) {
				m++;
				let mes_num = document.createElement('h5');
				let mesList = document.createElement('li');
				let commenter = document.createElement('h4');
				let mesTime = document.createElement('small');
				let mes = document.createElement('p');
				let btn = document.createElement('button');

				btn.setAttribute('onclick', 'onClick()');
				btn.innerHTML = '删除留言';
				commenter.innerHTML = item.account_num;
				mesTime.innerHTML = item.dt_2;
				mes.innerHTML = item.message;
				mes_num.innerHTML = m;
				mesBoard.appendChild(commenter);
				mesBoard.appendChild(mesTime);
				mesBoard.appendChild(mes);
				mesBoard.appendChild(mesList);
			}
		})
		.catch(e => (document.getElementsByClassName('mesBox').innerHTML = 'Error:' + e));
}

// 提交留言
function postMsg() {
	account_num = localStorage.getItem('account_number');
	username = localStorage.getItem('username');
	content = document.getElementById('content').value;
	let msg = {
		account_num: account_num,
		content: content,
		username: username,
	};
	fetch(baseurl + '/post_message', {
		method: 'post',
		body: JSON.stringify(msg),
		headers: new Headers({ 'Content-Type': 'application/json' }),
	})
		.then(response => response.json())
		.then(res => {
			setTimeout(displayMsg(), 500);
			alert('留言成功！');
		})
		.catch(e => {
			alert('e：留言失败！请重试！');
		});
}

// 修改留言
function changeMsg() {
	account_num = localStorage.getItem('account_number');
	username = localStorage.getItem('username');
	content = document.getElementById('content').value;
	let msg = {
		account_num: account_num,
		content: content,
		username: username,
	};
	fetch(baseurl + '/change_message', {
		method: 'put',
		body: JSON.stringify(msg),
		headers: new Headers({ 'Content-Type': 'application/json' }),
	})
		.then(response => response.json())
		.then(res => {
			setTimeout(displayMsg(), 500);
			alert('修改成功！');
		})
		.catch(e => {
			alert('e：修改失败！请重试！');
		});
}

function onClick() {
	account_num = localStorage.getItem('account_number');
	mes_num = document.getElementsByTagName('h5').value;
	fetch(baseurl + '/users/admin', {
		method: 'post',
		body: JSON.stringify({
			account_num: account_num,
			mes_num: mes_num,
		}),
		headers: new Headers({ 'Content-Type': 'application/json' }),
	})
		.then(res => res.json())
		.then(res => {
			if (res.status == 401) {
				alert('您没有管理员权限！');
				return false;
			} else {
				alert('删除留言成功！');
				displayMsg();
			}
		});
}
