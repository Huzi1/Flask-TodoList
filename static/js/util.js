// utility functions to be used by all files

function display() {
    document.getElementById('id01').style.display = 'none'
}

function toggleTick() {
    document.getElementById("tick").style.display = "none";
}

function clear() {
    document.getElementById("h1").innerHTML = "Edit list title here"

    document.getElementById("my_list").innerHTML = ""
}

//post request to server
function dataPost(dataobj, serverUrl) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", serverUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');


        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log("before resolve")
                resolve(JSON.parse(this.response))
                console.log("after resolve")
                // console.log("xhr response" + jsonObj["code"] + " " + jsonObj["message"])
                // return jsonObj

            }
        }
        xhr.send(JSON.stringify(dataobj));
    })
}

function formPost(data, serverUrl) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", serverUrl);
        xhr.setRequestHeader('formdata', 'data/form');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log("before resolve")
                resolve(JSON.parse(this.response))
                console.log("after resolve")

            }
        }
        xhr.send(data);

    })
}

function getImage(serverUrl) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverUrl);
        xhr.setRequestHeader('getdata', 'userdata');


        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log("before resolve")
                resolve(JSON.parse(this.response))
                console.log("after resolve")
                // console.log("xhr response" + jsonObj["code"] + " " + jsonObj["message"])
                // return jsonObj
// decodeURIComponent
            }
        }
        xhr.send(null)
    })

}

function saveData(listArr, complArr, serverUrl) {

    // var temp = ["Lists",String(listArr[0]), String(listArr[1])]


    var temp = {"values": listArr, "flags": complArr}

    // Lists['values']= listAr
    // let title = String(listArr[1])
    // let temp = {}
    // temp[title] = {}
    // temp[title] = [listArr, complArr]

    // for (let i = 2; i < listArr.length; i++) {
    //     // var value = "value"+String(i)
    //     if (complArr.includes(i)) {
    //             temp.push(listArr[i])
    //             temp.push("F1")
    //         // temp.push(
    //         //     {
    //         //         value : String(listArr[i]),
    //         //         "flag" : 1
    //         //     })
    //     } else {
    //         temp.push(listArr[i])
    //         temp.push('F0')
    // temp[title].push ( {
    //     'value': String(listArr[i]),
    //     'flag': 0
    // })
    //     }
    // }
    // let data = {
    //      "Lists": {
    //          title1: [
    //              listArr,
    //              complArr]
    //      }
    //  }

    // let data = {}
    // data["Lists"] = temp
    console.log("post data", temp)
    // console.log("this data" , data)
    // data =
    return dataPost(temp, serverUrl);
}

function bounceout() {
    document.getElementById("content-1").classList.remove("bounceOut")
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("content-1").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", '/listpage', true);
    xhttp.send();
    // var span = document.createElement("SCRIPT");
    // span.setAttribute("id", "tage-1");
    // span.innerText = "type='text/javascript' src='static/js/getList.js'>"
    // document.getElementsByTagName('head')[0].appendChild(span);
    // var head = document.getElementsByTagName('head')[0];
    // var script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.onload = function () {
    //     onLoad();
    // }
    // script.src = 'static/js/getList.js';
    // head.appendChild(script);
}

function getList(serverUrl) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');


        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log("before resolve")
                resolve(JSON.parse(this.response))
                console.log("after resolve")
                // console.log("xhr response" + jsonObj["code"] + " " + jsonObj["message"])
                // return jsonObj

            }
        }
        xhr.open("GET", '/getlist', true);
        xhr.send();

    })
};

// function onLoad() {
//     var keyTitles = []
//     var jsnRspns = getList('/getList')
//     // console.log("list recieved", jsnRspns);
//     jsnRspns.then(function (value) {
//         console.log(value['message']);
//         console.log('list data', jsnRspns);
//         Object.keys(value).forEach(function (key) {
//             console.table('Key : ' + key + ', Value : ' + value[key])
//
//             if (key != 'message') {
//                 keyTitles.push(key)
//                 var li = document.createElement("li");
//                 li.classList.add("list_item");
//
//                 var inputValue = String(key)
//
//                 var t = document.createTextNode(inputValue);
//
//                 li.appendChild(t)
//
//                 document.getElementById("my_list").appendChild(li);
//
//             }
//
//
//         })
//     })

