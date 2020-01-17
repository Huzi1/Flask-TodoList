window.addEventListener('load', function () {
    var todoLst = [];
    // console.log("loaded")
    var cleardLst = [];
    let img = document.getElementById('img')
    var imgSrc = localStorage.getItem('imgData')
    // console.log(imgSrc)
    img.src = "data:image/png;base64," + imgSrc

    var x = document.lastModified
    document.getElementById("timechk").innerHTML = "Last modified: " + x + "";
    var listDict = {}

    var keyTitles = []


    function onLoad() {
        document.getElementById("mySidenav").style.width = "250px";
        var jsnRspns = getList('/getList')
        // console.log("list recieved", jsnRspns);
        jsnRspns.then(function (value) {
            console.log(value['message']);
            console.log('list data', jsnRspns);
            Object.keys(value).forEach(function (key) {
                // console.table('Key : ' + key + ', Value : ' + value[key])

                if (key != 'message') {
                    listDict[key] = value[key]

                    keyTitles.push(key)
                    var li = document.createElement("li");
                    li.classList.add("stored_item");

                    var trash = document.createElement("i")

                    trash.className = "fas"
                    trash.className += " fa-trash-alt"
                    // trash.className += " bin"


                    var inputValue = String(key)
                    var span = document.createElement("SPAN")
                    span.className = "bin"
                    span.appendChild(trash)

                    var t = document.createTextNode(inputValue);
                    // t.setAttribute("name","show-list");
                    // console.log(t)
                    li.appendChild(t)
                    li.appendChild(span)

                    document.getElementById("stored-list").appendChild(li);

                    span.onclick = function () {
                        li.parentElement.removeChild(li)
                    };
                }


            })
        })
    }


    //Save list
    document.getElementById("save").addEventListener("click", save_list, false);

    function save_list() {
        const ulItems = document.getElementById("my_list");
        var x = document.lastModified
        var children = ulItems.children;
        todoLst[0] = String(x)
        todoLst[1] = String(document.getElementById("h1").innerText)
        for (let i = 0; i < children.length; i++) {
            console.log("ul children", String(children[i].innerText))
            var value = String(children[i].innerText)
            todoLst[i + 2] = value.split("\n", 1)[0]
        }
        var jsnRspne = saveData(todoLst, cleardLst, "/update")

        jsnRspne.then(function (value) {

            if (value["code"] === 200) {
                document.getElementById("tick").style.display = "block";
                setTimeout("toggleTick()", 5000)
                console.log(value["message"])
            } else {
                console.log((value["message"]))
            }

        })
        // document.getElementById("h1").innerHTML = "Edit list title here"
        //
        // document.getElementById("my_list").innerHTML= ""
        // setTimeout("toggleTick()", 5000)
        console.log(todoLst)
    }

    //Add list items
    document.getElementById("addBtn").addEventListener("click", addItem, false);

    //Add list items
    function addItem() {
        // console.log("in function")
        var li = document.createElement("li");

        li.classList.add("list_item");
        var inputValue = document.getElementById("myInput").value;
        var t = document.createTextNode(inputValue);
        li.appendChild(t)
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close"

        span.appendChild(txt);
        li.appendChild(span)
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            document.getElementById("my_list").appendChild(li);

        }

        document.getElementById("myInput").value = "";

        span.onclick = function () {
            li.parentElement.removeChild(li)
        };
    }

    document.getElementById("stored-list").addEventListener('click', function (e) {


        if (e.target.tagName === 'LI') {
            clear()
            var label = e.target.innerText
            // console.log(label)
            console.log("key: " + label + " value: ")
            console.log("flags in key", (listDict[label]['flags']))
            // e.target.className = "foo"; // new class name here
            //  Object.keys(value).forEach(function (key) {
            // console.table('Key : ' + key + ', Value : ' + value[key])
            // Object.keys(listDict[label]).forEach(function (key) {
            //         console.table('Key : ' + key + ', Value : ' + (listDict[label])[key])
            //         // for (let i = 0; i < (listDict[label]).length; i++) console.log((listDict[label][i]));
            //         if(listDict[label]['flags'].contains()))
            //     }
            // )
            document.getElementById("h1").innerHTML = label
            document.getElementById("timechk").innerHTML = "Last Modified" + (listDict[label]['values'])[0]
            for (let i = 0; i < (listDict[label]['values']).length; i++) {
                if (i > 2) {

                    // var li = document.createElement("li");
                    //
                    // li.classList.add("list_item");
                    // var inputValue = document.getElementById("myInput").value;
                    // var t = document.createTextNode(inputValue);
                    // li.appendChild(t)
                    // var span = document.createElement("SPAN");
                    // var txt = document.createTextNode("\u00D7");
                    // span.className = "close"
                    //
                    // span.appendChild(txt);
                    // li.appendChild(span)


                    var li = document.createElement("li");

                    li.classList.add("list_item");
                    var inputValue = (listDict[label]['values'])[i];
                    var t = document.createTextNode(inputValue);
                    console.log("check values here", t)
                    li.appendChild(t)
                    var span = document.createElement("SPAN");
                    var txt = document.createTextNode("\u00D7");
                    span.className = "close"

                    span.appendChild(txt);
                    li.appendChild(span)

                    span.onclick = function () {
                        this.parentElement.remove()
                    };

                    if ((listDict[label]['flags']).includes(i)) {
                        li.classList.toggle('checked');
                        document.getElementById("my_list").appendChild(li);
                    } else
                        document.getElementById("my_list").appendChild(li);
// ev.target.classList.toggle('checked');

                }
            }
        }
    });


    //check cross toggle in list
    var mylist = document.getElementById("my_list")
    mylist.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            // console.log("inside listener")
            const ulItems = document.getElementById("my_list");
            let i = Array.prototype.indexOf.call(ulItems.childNodes, ev.target);
            // console.log("index of " + i)
            ev.target.classList.toggle('checked');
            if (ev.target.classList.contains('checked')) {
                cleardLst.push(i);
                // console.log(cleardLst)
            }

        }
    }, false);


//New list option +
    document.getElementById("3").addEventListener("click", function () {
        document.getElementById('id01').style.display = 'block';


    });
//Model box cancel option
    document.getElementById("no-save").addEventListener("click", function () {
        clear()

    });

    document.getElementById("delete").addEventListener("click", function () {
        clear()
    })
    document.getElementById("save-me").addEventListener("click", function () {
        save_list()
    })

    document.getElementById("sim-sim").addEventListener("click", function (event) {
        onLoad()
        event.stopPropagation()
        // document.getElementById("mySidenav").style.width = "250px";
    }, false);

    /* Set the width of the side navigation to 0 */
    document.getElementById("clsebtn").addEventListener("click", function () {
        document.getElementById("stored-list").innerHTML = ""
        document.getElementById("mySidenav").style.width = "0";

    });

})
;