import resp as resp
from flask import Flask, jsonify, json, request, sessions, render_template, make_response, session, redirect, url_for
from werkzeug.utils import secure_filename
import base64
import db as db
import os, json
ENCODING = 'utf-8'
app = Flask(__name__, static_folder="static")
app.secret_key = os.urandom(24)


@app.route('/login', methods=['POST'])
def log_submit():

    print("in submit function")
    obj = json.loads(request.data.decode('utf-8'))
    userName = obj['userName']
    pswd = obj['password']
    print(pswd)
    userCred, code = db.validate(userName)
    # print(userCred)
    userCred = json.loads(userCred)
    print(type(userCred))
    print("print after dp response json " + userCred["password"])
    # print(userCred['password'])
    if 'user' in session:
        print('user already logged in')
        return jsonify(message="user already logged in", code=203)

    if code == 404:
        # data = "{'message': 'not registered', 'code': 404}"
        # json_data = json.dumps(data)
        # print(json_data)
        return jsonify(message='Not a registered user', code=404)
    elif code == 200:
        if userCred["password"] == pswd:
            session['user'] = userName
            # return jsonify(message='/home', code=200)
            print("before /home"+session['user'])
            # add imagestring here in session
            return jsonify(message="/home", code=200)
        else:
            return jsonify(message="Invalid password", code=201)
    else:
        return jsonify(message="Error", code=202)


# @app.route('getsession')
# def get_session():
#
#     if 'user' in session:
#         return session['user']
#
#     return 'Not logged in'


@app.route('/')
def index_log():
    # load index
   return redirect(url_for('index_home'))


@app.route('/getImage')
def get_image():

    if 'user' in session:
        id_ = session.get('user')
        userData, code = db.read(id_, 0)
        # userData = json.loads(userData)
        print(userData)
        if code == 201:
            userData['code'] = 201
            userData = json.dumps(userData)
            return userData
        elif code == 200:
            userData['img'] = (userData['img']).decode(ENCODING)
            userData['code'] = 200
            userData = json.dumps(userData)
            return userData
        else:

            return jsonify(message="DB read error", code=404)
    else:

        return jsonify(message="server read error", code=404)



@app.route('/logout')
def log_out():
    if 'user' in session:
        print("logout before pop "+session.get('user'))
        session.pop('user', None)
        # print("logout after pop" + session['user'])
        return render_template('login.html')
    else:
        return redirect('login.html', 'not logged in')


@app.route('/catalog')
def list_dashbd():
    return render_template('list.html')


@app.route('/regis')
def index_regis():
    # resp = make_response(render_template('register.html'))
    # # resp.set_cookie('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
    # resp.set_cookie('same-site-cookie', 'foo', samesite='Lax');
    # # resp.set_cookie('cross-site-cookie', 'bar', samesite='Lax', secure=True);
    # resp.headers.add('Set-Cookie', 'cross-site-cookie=bar; SameSite=None; Secure')
    # response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict")
    return render_template('register.html')


@app.route('/listpage')
def get_listpage():
    if 'user' in session:

       return  render_template('getList.html')


@app.route('/getlist', methods=['GET'])
def get_listdata():
    if 'user' in session:
        id_ = session.get('user')
        obj, code = db.read(id_, 1)
        # obj = json.loads(obj)
        print(obj)
        if code == 200:
            obj['message'] = 'List retrieved'
            obj = json.dumps(obj)

            return obj
        else:
            return jsonify(message='fail')


@app.route('/home')
def index_home():
    if 'user' in session:
        print("in index function "+session['user'])
        return render_template('index.html')
    else:
        return render_template('login.html')


@app.route('/register', methods=['POST'])
def register():
    email = request.form['uname']
    fName = request.form['fname']
    lName = request.form['lname']
    password = request.form['psw']
    passwordConfirm = request.form['psw2']
    # print("request.form['psw']")
    image = request.files['img']

    imageB64 = base64.b64encode(image.read())

    print(imageB64)

    # print("request.files['img']")
    # image.save(secure_filename(image.filename))
    # print("f.save(secure_filename(f.filename))")
    _, code = db.validate(email)
    print(code)
    if code == 200:
        # username conflict
        return jsonify(message="username already registered", code=404)
    elif password != passwordConfirm:
        # password not matching
        return jsonify(message="password do not match", code=201)
    else:
        data = {'password': password, 'fName': fName, 'lName': lName, 'img': imageB64}
        _, chkCode = db.create(email, data)

        if chkCode == 200:

            return jsonify(message="Account created", code=200)
        else:

            return jsonify(message='Database insert error', code=404)


@app.route('/url_variables/<string:name>/<int:age>')
def param_func(name: str, age: int):
    # name = request.args.get('name')
    # age = int(request.args.get('age'))
    if age < 19:
        return jsonify(message='Sorry' + name + 'you are not old enough '), 401
    else:
        return jsonify(messege='Welcome {} age {} you are old enough'.format(name, age)), 200


@app.route('/add', methods=['POST'])
def create():
    #  id + data
    return db.create()


@app.route('/list', methods=['GET'])
def read():
    id_ = request.args.get('id_')
    return db.read(id_)


@app.route('/update', methods=['POST', 'PUT'])
def update(new_obj=None):
    if 'user' in session:
        id_ = session.get('user')
        print("this user"+id_)
        obj = json.loads(request.data.decode('utf-8'))
        print(obj["values"][1])
        title = obj["values"][1]
        print(obj)

        # '.{}'.format(title) =
        # items = []
        # Defaults = {'value': '', 'flag': ''}
        # new_obj[obj[2]] = { 'TimeStamp': obj[1] }
        # for i in range(len(obj)):
        #
        #     if i > 2:
        #         {items.append('item_{}'.format(i-3))}
        # D = dict.fromkeys(items, Defaults)
        # D['timeStamp'] = obj[1]
        #
        # for i in range(len(obj)):
        #     if i > 2:
        #
        #         if ((i+1) < len(obj)) and (obj[i+1] == 'F1' or obj[i+1] == 'F0'):
        #             D['item_{}'.format(i)] = {'value': obj[i], 'flag': obj[i+1]}
        #

        print(obj["values"])
        data = {
                "Lists": {title: obj}
        }
        # data = json.dumps(data)
        _, code = db.update(id_, data)
        if code == 200:

            # return db.update(id_)
            return jsonify(message="done bitch", code=200)
        else:
            return jsonify(message="error from db", code=404)

    else:

        return jsonify(message="user not in session", code=404)


@app.route('/validate')
def validate():
    id_ = request.args.get('id_')
    return db.validate(id_)


# @app.route('/delete', methods=['GET', 'DELETE'])
# def read():
#     return db.delete()


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
