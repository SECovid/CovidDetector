import os
from flask import Flask
from backend.make_prediction import make_prediction_blueprint
from backend.upload_medical_test import  upload_medical_test_blueprint
from backend.authentication import  auth_blueprint
from backend.covid_report import  covid_reports_blueprint

from flask_cors import CORS





def create_app(test_config=None):

    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    CORS(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(make_prediction_blueprint, url_prefix='/prediction')
    app.register_blueprint(upload_medical_test_blueprint, url_prefix='/medical')
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(covid_reports_blueprint, url_prefix='/reports')

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'


    return app