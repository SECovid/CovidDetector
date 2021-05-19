from flask import Blueprint
from flask import current_app, flash, jsonify, make_response, redirect, request, url_for
from backend import authentication
from backend import database
from ml.model import retraining_model
from ml.model import log
from backend.admin import statistics
from ml.data import dataset
from project_test import tests_handler
admin_blueprint = Blueprint('admin', __name__)

#Check if logged in as admin
#Retrain model manually if admin
#Rollback to previous models
@admin_blueprint.route('/retrain',methods=['POST'])
def retrain():
    #authentication.isLoggedInAdmin(request)
    if(True):
        post_data = request.json

        try:
            res = retraining_model.retraining_pipeline(post_data['date'])
        except:
            res = retraining_model.retraining_pipeline()

        if(res == "TRAINED"):
            responseObject = {
                'status': 'success',
                'message': 'Successfully retrained the model'
            }
        else:
            responseObject = {
                'status': 'success',
                'message': 'Model was not retrained'
            }
        return make_response(jsonify(responseObject)), 200
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Not logged in as admin'
        }
        return make_response(jsonify(responseObject)), 400





#get statistics if admin
##type 1: Example: Cough/ Positive return cough: avg %cov if COUGH avg %cov if NO COUGH
@admin_blueprint.route('/statistics/factor/<factor>',methods=['GET'])
def getFactorStatistics(factor):
    try:
        ifTrue, ifFalse =statistics.getFactorStatistics(factor)
        responseObject = {
            'status': 'success',
            'ifTrue': ifTrue,
            'ifFalse': ifFalse
        }
        return make_response(jsonify(responseObject)), 200
    except Exception as e:
        responseObject = {
            'status': 'fail'
        }
        return make_response(jsonify(responseObject)), 400

##type 2: Example: %cov,time
@admin_blueprint.route('/statistics/time',methods=['GET'])
def getStatisticsTime():
    covidTime = statistics.getStatisticsTime()
    responseObject = {
        'status': 'success',
        'covidTime': covidTime
    }
    return make_response(jsonify(responseObject)), 200

##type 3: Example: avg %cov per country
@admin_blueprint.route('/statistics/country',methods=['GET'])
def getCountryStatistics():
    try:

        covidCountryAverage = statistics.getCountryStatistics()
        responseObject = {
            'status': 'success',
            'covid': covidCountryAverage
        }
        return make_response(jsonify(responseObject)), 200
    except Exception as e:
        responseObject = {
            'status': 'fail'
        }
        return make_response(jsonify(responseObject)), 400




#Check model health / run unit tests?
@admin_blueprint.route('/tests',methods=['GET'])
def runUnitTests():
    try:
        result, failures = tests_handler.run_test()

        print('API result ',result)
        print('API failures ',failures)
        responseObject = {
            'status': 'success',
            'result': result
        }
        return make_response(jsonify(responseObject)), 200
    except Exception as e:
        responseObject = {
            'status': 'fail'
        }
        return make_response(jsonify(responseObject)), 400
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



#View number of total training data
@admin_blueprint.route('/total_training_data',methods=['GET'])
def total_number_of_trainin_data():
    try:
        size = dataset.get_all_data_size()
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


#Average covid percentage
@admin_blueprint.route('/average_covid_percentage',methods=['GET'])
def average_covid_percentage():
    try:
        listOfCovidPercentages = database.get_all_covid_reports()
        listOfCovidPercentages = [item for sublist in  listOfCovidPercentages for item in sublist]
        average = (sum(listOfCovidPercentages) / len(listOfCovidPercentages))
        responseObject = {
            'status': 'success',
            'message': 'Successfully fetched average covid percentage',
            'average': average
        }
        return make_response(jsonify(responseObject)), 200
    except:
        responseObject = {
            'status': 'fail',
            'message': 'Couldn\'t get average covid percentage'
        }
        return make_response(jsonify(responseObject)), 400