window.addEventListener('DOMContentLoaded', function () {
    var keyTitles = []


    // function onLoad() {

    var jsnRspns = getList('/getList')
    // console.log("list recieved", jsnRspns);
    jsnRspns.then(function (value) {
        console.log(value['message']);
        console.log('list data', jsnRspns);
        Object.keys(value).forEach(function (key) {
            console.table('Key : ' + key + ', Value : ' + value[key])

            if (key != 'message') {

                keyTitles.push(key)
            }


        })
        })


        for (let i = 0; keyTitles.length; i++) {


            var li = document.createElement("li");
            li.classList.add("list_item");

            var inputValue = String(keyTitles[i])

            var t = document.createTextNode(inputValue);

            li.appendChild(t)

            document.getElementById("my_list").appendChild(li);


        }




    // }
});