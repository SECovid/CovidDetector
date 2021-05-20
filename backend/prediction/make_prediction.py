from flask import Blueprint
from flask_cors import cross_origin
from ml.prediction import predict_covid
from ml.spectogram import audio_processing
from flask import Flask, request, jsonify
from backend.authentication import authentication
from backend import database
from tensorflow import keras
import base64
import os
import json
from flask import jsonify

model = keras.models.load_model('ml/model/trained_model/CNN_COUGH_COVID_DETECTOR_MODEL_tf')
make_prediction_blueprint = Blueprint('make_prediction', __name__)


@make_prediction_blueprint.route('/fast_prediction', methods=['POST'])
def make_fast_prediction():
    try:
        encoded_string = request.json['data']

        temp_filename = "temp.wav"
        wav_file = open(temp_filename, "wb")
        decoded_string = base64.b64decode(encoded_string)
        wav_file.write(decoded_string)
        spectrogram = audio_processing.audio_to_spectrogram(temp_filename)
        result = predict_covid.make_fast_prediction(spectrogram, model)
        wav_file.close()
        if os.path.exists(temp_filename):
            print('CLOSING')
        # os.remove(temp_filename)
        else:
            print("The file does not exist")

        # If logged in should add it to history
        if (authentication.isLoggedIn(request)):
            user_id = authentication.isLoggedIn(request)['id']
            request.json['user_id'] = user_id
            request.json['covid_percentage'] = result[0].tolist()
            database.add_covid_report(request.json)
        return json.dumps({"results": result.tolist()})

    except NameError:
        print(NameError)
        return json.dumps({"results": []})


@make_prediction_blueprint.route('/accurate_prediction', methods=['POST'])
def make_accurate_prediction():
    try:
        spectrograms = []
        encoded_strings = request.json['data']
        for encoded_string in encoded_strings:
            temp_filename = "temp.wav"
            wav_file = open(temp_filename, "wb")
            decoded_string = base64.b64decode(encoded_string)
            wav_file.write(decoded_string)
            spectrogram = audio_processing.audio_to_spectrogram(temp_filename)
            spectrograms.append(spectrogram)
            wav_file.close()
            if os.path.exists(temp_filename):
                os.remove(temp_filename)
            else:
                print("The file does not exist")
        result = predict_covid.make_accurate_prediction(spectrograms, model)

        # If logged in should add it to history
        if (authentication.isLoggedIn(request)):
            user_id = authentication.isLoggedIn(request)['id']
            request.json['user_id'] = user_id
            request.json['covid_percentage'] = result[0]
            database.add_covid_report(request.json)

        return json.dumps({"results": result.tolist()})
    except:
        return json.dumps({"results": []})
