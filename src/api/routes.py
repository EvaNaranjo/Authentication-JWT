"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint 
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.admin import setup_admin
from api.models import db, User

api=Blueprint("api", __name__)


#from models import Person

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_CONNECTION_STRING')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app)
setup_admin(app)
jwt = JWTManager(app)


# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@api.route('/')
def sitemap():
    return generate_sitemap(app)


@api.route('/user/signup', methods=['POST'])
def user_signup():
    
    body = request.get_json(force=True)
    print(body)
    new_user=User(email=body["email"], password=body["password"], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    
    response= jsonify(new_user.serialize())
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Content-Type', 'application/json')

    print(response.get_data())
    return response,201

@api.route('/user/login', methods=['POST'])
def user_login():
    body = request.get_json(force=True)
    print(body)
    user=db.session.query(User).filter(User.email==body["email"])[0]
    if user.password == body["password"]:
        access_token = create_access_token(identity = user.id)
        response = jsonify(access_token)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response,200
    else:
        return jsonify("Error user dont exist"),401


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_token=get_jwt_identity()
    print(user_token)
    user=User.query.get(user_token)
    response = jsonify(user.serialize())
    # response.headers.add('Access-Control-Allow-Origin', '*')

    return response, 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)
