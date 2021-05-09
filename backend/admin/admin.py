from flask import Blueprint
from flask import current_app, flash, jsonify, make_response, redirect, request, url_for
from backend import authentication
from backend import database
from ml.model import retraining_model
from ml.model import log
from backend.admin import statistics
admin_blueprint = Blueprint('admin', __name__)

#Check if logged in as admin
#Retrain model manually if admin
#Rollback to previous models
@admin_blueprint.route('/retrain',methods=['POST'])
def retrain():
    if(authentication.isLoggedInAdmin(request)):
        post_data = request.json

        try:
            retraining_model.retraining_pipeline(post_data['date'])
        except:
            retraining_model.retraining_pipeline()

        responseObject = {
            'status': 'success',
            'message': 'Successfully retrained the model'
        }
        return make_response(jsonify(responseObject)), 200
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Not logged in as admin'
        }
        return make_response(jsonify(responseObject)), 400





#get statistics if admin
##type 1: Example: Cough/ Positive return cough: %pos %neg and no cough %pos and %neg
@admin_blueprint.route('/statistics/factor/<factor>',methods=['GET'])
def getFactorStatistics(factor):
    pass
##type 2: Example: %pos and %neg per time frame
@admin_blueprint.route('/statistics/time',methods=['GET'])
def getStatisticsTime():
    pass
##type 3: Example: %pos and %neg per country
@admin_blueprint.route('/statistics/country/<country>',methods=['GET'])
def getCountryStatistics(country):

    pass




#Check model health / run unit tests?

#Delete elements from db/ Get list of trainin data elements?



#View How much training data used
@admin_blueprint.route('/training_data',methods=['GET'])
def number_of_trainin_data():
    try:
        size = log.getSizeFromLogs()
        responseObject = {
            'status': 'success',
            'message': 'Successfully fetched training size',
            'size': size
        }
        return make_response(jsonify(responseObject)), 200
    except:
        responseObject = {
            'status': 'fail',
            'message': 'Couldn\'t get training size'
        }
        return make_response(jsonify(responseObject)), 400