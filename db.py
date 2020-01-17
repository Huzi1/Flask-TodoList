import traceback
# from heapq import merge

import firebase_admin, re
from firebase_admin import credentials, firestore, initialize_app
from flask import Flask, request, jsonify
import json

# Initialize Firestore DB


cred = credentials.Certificate("./key.json")
fbAdmin = firebase_admin.initialize_app(cred)
db = firestore.client()
todo_ref = db.collection('users')


def create(id_, data):
    try:
        for char in re.findall("([A-Z]+)", id_):
            id_ = id_.replace(char, char.lower())
        doc_ref = db.collection(u'users').document(u'{}'.format(id_))
        doc_ref.set(data)
        # id_ = request.json['id']
        # todo_ref.document(id_).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return "An Error  at create:{}".format(e), 404


def validate(id_):
    try:
        for char in re.findall("([A-Z]+)", id_):
            id_ = id_.replace(char, char.lower())

        check = todo_ref.document(id_).get().exists
        # print(id_)
        if check is False:
            jsnRspns = '{"message": "not a valid user", "password":"None"}'
            return jsnRspns, 404
        else:
            # todo = todo_ref.document(id_).get()
            getDoc = (todo_ref.document(id_).get()).to_dict()
            # delete next two lines after checking
            getPsw = getDoc['password']
            userCred = {'ID': id_, 'password': getPsw}

            json_data = json.dumps(userCred)
            print(json_data)
            return json_data, 200

    except Exception as e:
        return "An Error Occured: {}".format(e), 404


def read(id_, flag):
    users_ref = db.collection(u'users')

    # docs = users_ref.stream()
    try:
        getDoc = (todo_ref.document(id_).get()).to_dict()
        print(getDoc)
        if flag == 1:

            getFields = getDoc['Lists']
            # all_todos = [doc.to_dict() for doc in docs]
            print(getFields)
            return getFields, 200
        else:
            # getPsw = getDoc['password']
            # print(getPsw)
            if 'img' in getDoc:
                return getDoc, 200
            else:

                return getDoc, 201

    except Exception as e:
        return "An Error  at read:{}".format(e), 404


# use update to modify or delete a field
def update(id_, data):
    try:
        print(data)
        todo_ref.document(id_).set(data,
                                   merge=True
                                   )
        return jsonify({"success": True}), 200
    except Exception as e:
        traceback.print_exc()
        return "An Error at update:{}".format(e), 404

# def deleteField():
#     try:
#         # Check for ID in URL query
#         todo_id = request.args.get('id')
#         todo_ref.document(todo_id).delete()
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return "An Error at delete:{}".format(e)
