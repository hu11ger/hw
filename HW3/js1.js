 // 显示留言
 window.onload = displayMsg()
 function displayMsg() {
     fetch(baseurl, {
         method: 'get'
     })
         .then(response => response.json())
         // 以列表形式显示
         .then(data => {
             for (item in data) {
                 let mesList = document.createElement('li')
                 let commenter = document.createElement('h4')
                 let mesTime = document.createElement('small')
                 let mes = document.createElement('p')

                 commenter.innerHTML = item.account_num
                 mesTime.innerHTML = item.dt_2
                 mes.innerHTML = item.message

                 mesBoard.appendChild(commenter)
                 mesBoard.appendChild(mesTime)
                 mesBoard.appendChild(mes)
                 mesBoard.appendChild(mesList)
             }
         })
         .catch(e => document.getElementsByClassName('mesBox').innerHTML = 'Error:' + e)
 }

 // 提交留言
 function postMsg() {
     account_num = document.getElementById('account_num').value
     content = document.getElementById('content').value
     let msg = {
         'account_num': account_num,
         'content': content
     }
     fetch(baseurl + '/post_message', {
         method: 'post',
         body: JSON.stringify(msg),
         headers: new Headers({ 'Content-Type': 'application/json' })
     })
         .then(response => response.json())
         .then(res => setTimeout(displayMsg(), 500))
         .catch(e => document.getElementsByClassName('tipBox').innerHTML = '留言失败！请重试！')
 }

 // 修改留言
 function changeMsg() {
     account_num = document.getElementById('account_num').value
     content = document.getElementById('content').value
     let msg = {
         'account_num': account_num,
         'content': content
     }
     fetch(baseurl + '/change_message', {
         method: 'put',
         body: JSON.stringify(msg),
         headers: new Headers({ 'Content-Type': 'application/json' })
     })
         .then(response => response.json())
         .then(res => setTimeout(displayMsg(), 500))
         .catch(e => document.getElementsByClassName('tipBox').innerHTML = '留言失败！请重试！')
 }