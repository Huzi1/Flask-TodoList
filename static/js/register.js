window.addEventListener('load', function () {

// var fileInput = document.getElementById('the-file');
// var file = fileInput.files[0];
// var formData = new FormData();
// formData.append('file', file);
    document.getElementById("regis_new").addEventListener("click", function () {

            // var flag = 0

            var form = document.getElementById('myForm');
            var formData = new FormData(form);


            var usr = document.getElementsByName("uname")[0].value;
            var psw = document.getElementsByName("psw")[0].value;
            var psw2 = document.getElementsByName("psw2")[0].value
            var fName = document.getElementsByName("fname")[0].value;
            var lName = document.getElementsByName("lname")[0].value;
            var image = document.getElementById("uImage").value;

            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usr)) || (psw === "" && psw2 === "")) {
                alert("Invalid username and password");
            } else if (fName === "" || lName === "") {
                alert("missing first and last name");
            } else if (!((/\.(gif|jpg|jpeg|tiff|png)$/i).test(image))) {
                alert("Image file should be image type and size < 100*1024");
            }

            else {
                if (psw !== psw2) {
                    alert("password do not match");
                } else
                    var newUser = {
                        username: usr,
                        password: psw,
                        firstName: fName,
                        lastName: lName,
                        // image: formData
                    }
                // console.log(formData)

                var jsnRspns = formPost(formData, "/register")

                jsnRspns.then(function (value) {
                    console.log(" response received"+value)

                    console.log(value[0])
                    console.log(value["code"]);

                    if (value) {
                        console.log(value["code"])
                        if (value["code"] === 200) {
                            alert("Registered")
                            window.location.assign("/home");
                        } else if (value["code"] === 404) {
                            alert("User name already registered");
                        } else if (value["code"] === 201) {
                            alert(value["message"]);
                        } else {
                            alert("server error!")
                        }

                    }
                });
            }
            ;
        }
    );


})
;