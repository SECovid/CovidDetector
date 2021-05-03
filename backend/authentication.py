import jwt
import datetime
from backend import config
from flask import Blueprint
from flask import current_app, flash, jsonify, make_response, redirect, request, url_for
import bcrypt
from backend import database
auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/login',methods=['POST'])
def login():
    # get the post data
    if isLoggedIn(request):
        print("Logged in already")
        responseObject = {
            'status': 'fail',
            'message': 'Already logged in'
        }
        return make_response(jsonify(responseObject)), 406


    post_data = request.json
    try:
        # Check if correct pass
        username = post_data['username']
        input_password = post_data['password']
        role = post_data['role']

        if(role == 'admin'):
            #Get  account from admin table
            rows = database.get_admin(username)
            id = rows[0][0]
            password = rows[0][2]
        else:
            #Get account from user table
            rows = database.get_user(username)
            id = rows[0][0]
            password = rows[0][8]


        if bcrypt.checkpw(input_password.encode("utf-8"), password.encode("utf-8")):
            print("Password match!")
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Try again'
            }
            return make_response(jsonify(responseObject)), 400

        auth_token = encode_auth_token(id,username,role)


        if auth_token:
            responseObject = {
                'status': 'success',
                'message': 'Successfully logged in.',
                'auth_token': auth_token.decode()
            }
            return make_response(jsonify(responseObject)), 200
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Try again'
        }
        return make_response(jsonify(responseObject)), 400



@auth_blueprint.route('/register',methods=['POST'])
def register():
    post_data = request.json
    try:
        post_data["password"] = bcrypt.hashpw(post_data["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        print(post_data["password"])
        print(post_data)
        database.add_user(post_data)
        responseObject = {
            'status': 'success',
            'message': 'Successfully logged in.'
        }
        return make_response(jsonify(responseObject)), 200
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Try again'
        }
        return make_response(jsonify(responseObject)), 400



def isLoggedIn(request):
    # get the auth token
    auth_header = request.headers.get('Authorization')
    print('AUTH HEADER', auth_header)
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        resp = decode_auth_token(auth_token)
        return resp
    else:
        print('NO TOKEN')
        return

def isLoggedInAdmin(request):
    # get the auth token
    auth_header = request.headers.get('Authorization')
    print('AUTH HEADER', auth_header)
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        resp = decode_auth_token(auth_token)
        if(resp['role'] == 'admin'):
            return resp
        else:
            return
    else:
        print('NO TOKEN')
        return

def encode_auth_token(user_id,username,role):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
            'iat': datetime.datetime.utcnow(),
            'id': user_id,
            'username': username,
            'role': role #Normal user or admin
        }
        return jwt.encode(
            payload,
            config.SECRET_KEY,
            algorithm='HS256'
        )
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        print(auth_token)
        payload = jwt.decode(auth_token, config.SECRET_KEY)
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'