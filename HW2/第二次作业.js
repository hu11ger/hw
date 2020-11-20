window.onload = function () {
    var getRequest = new XMLHttpRequest();
    Baseurl = 'http://thungghuan.xyz:3000'
    div1 = document.getElementById('div1')
    getRequest.open('get', Baseurl + '/users');
    getRequest.send(null);
    getRequest.onreadystatechange = function () {
        if (getRequest.readyState == 4) {
            if (getRequest.status == 200) {
                var list = '<ul>用户列表'
                var data = Object(eval(getRequest.responseText))
                var length = data.length;
                for (var item = 0; item < length; item++) {
                    list += '<li>' + data[item] + '</li>'

                }
                list += '</ul>';
                document.getElementById('div1').innerHTML = list
            } else {
                alert(getRequest.responseText)
            }
        }
    }
}
function postData() {
    name = document.getElementById('name').value;
    num = document.getElementById('num').value;
    var postRequest = new XMLHttpRequest();
    var Data = {
        'name': name,
        'num': String(num)
        
    }

    postRequest.open('post', Baseurl + '/add');
    postRequest.setRequestHeader('content-type', 'application/json');
    postRequest.send(JSON.stringify(Data));
    postRequest.onreadystatechange = function () {
        if (postRequest.readyState == 4) {
            if (postRequest.status == 200) {
                console.log(postRequest.responseText)
            } else {
                alert(postRequest.responseText)
            }
        }
    }
}


// document.createElement
// appendchildren