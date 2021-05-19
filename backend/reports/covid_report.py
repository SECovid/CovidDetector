
from flask import Blueprint
from flask import current_app, flash, jsonify, make_response, redirect, request, url_for
from backend.authentication import authentication
from backend import database


covid_reports_blueprint = Blueprint('covid_reports', __name__)

@covid_reports_blueprint.route('/',methods=['GET'])
def get_covid_reports():
    if (authentication.isLoggedIn(request)):
        user_id = authentication.isLoggedIn(request)['id']

        reports = database.get_covid_reports(user_id)

        responseObject = {
            'status': 'success',
            'message': 'Successfully retrieved reports.',
            'covid_reports': reports
        }
        return make_response(jsonify(responseObject)), 200
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Not logged in'
        }
        return make_response(jsonify(responseObject)), 400