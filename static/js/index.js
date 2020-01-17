window.addEventListener('load', function () {

    let img = document.getElementById('img')

    var obj = getImage('/getImage')


    obj.then(function (value) {
        console.log(value)
        var imgSrc = value["img"]
        localStorage.setItem("imgData", imgSrc);
        img.src = "data:image/png;base64," + imgSrc
        // console.log(imgSrc)
        localStorage.setItem("imgData", imgSrc);
    })

    document.getElementById("box2").addEventListener("click", function () {
        document.getElementById("content-1").classList.add("bounceOut")


        // bounceout()
        setTimeout(function () {
            bounceout()
        }, 5500);

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';

        // script.onload = function () {
        //     onLoad();
        // }

        script.src = 'static/js/getList.js';
        head.appendChild(script);
    });


});

