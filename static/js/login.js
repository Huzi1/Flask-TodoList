window.addEventListener('load', function () {



    function PlaySound() {
        var sound = document.getElementById("audio");
        sound.play()
    }


    document.getElementById("log_in").addEventListener("click", function () {
        var usr = document.getElementsByName("uname")[0].value;
        var psw = document.getElementsByName("psw")[0].value;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usr) && usr !== "" && psw !== "") {

            // console.log(usr + " " + psw)
            var logCreds = {
                userName: usr, password: psw
            }
            // }const city = new Promise((resolve, reject) => {
            // const p = new Promise((resolve, reject) => {
            var jsnRspns = dataPost(logCreds, "/login")


            jsnRspns.then(function (value) {
                console.log(value);
                if (value) {
                    // console.log(jsnRspns)
                    switch (value["code"]) {
                        case 404:
                            alert("Not a registered user");
                            break;
                        case 201:
                            alert(value["message"]);
                            break;
                        case 202:
                            alert(value["message"]);
                            break;
                        case 203:
                            alert(value["message"]);
                        case 200:
                            // alert(value["message"]);
                            window.location.assign(value['message'])
                    }
                }
                // expected output: "Success!"
            });

            document.getElementsByName("uname")[0].value = "";
            document.getElementsByName("psw")[0].value = "";


        } else {
            alert("Invalid username and password")
        }

    })
    ;


    // function dataPost(dataobj, serverUrl) {
    //     return new Promise(function (resolve, reject) {
    //         var xhr = new XMLHttpRequest();
    //         xhr.open("POST", serverUrl);
    //         xhr.setRequestHeader('Content-Type', 'application/json');
    //
    //
    //         xhr.onreadystatechange = function () {
    //             if (xhr.readyState === 4) {
    //                 console.log("before resolve")
    //                 resolve(JSON.parse(this.response))
    //                 console.log("after resolve")
    //                 // console.log("xhr response" + jsonObj["code"] + " " + jsonObj["message"])
    //                 // return jsonObj
    //
    //             }
    //         }
    //         xhr.send(JSON.stringify(dataobj));
    //     })
    // }

})
;
