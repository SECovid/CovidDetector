from flask import Blueprint
from ml.prediction import predict_covid
from ml.spectogram import audio_processing
from flask import Flask, request, jsonify
import tensorflow as tf
import base64
import os

model = tf.keras.models.load_model('ml/model/trained_model/CNN_COUGH_COVID_DETECTOR_MODEL_tf')
make_prediction_blueprint = Blueprint('make_prediction', __name__)

@make_prediction_blueprint.route('/fast_prediction',methods=['POST'])
def make_fast_prediction():
    encoded_string = request.json['data']
    temp_filename = "temp.wav"
    wav_file = open(temp_filename, "wb")
    decoded_string = base64.b64decode(encoded_string)
    wav_file.write(decoded_string)
    spectrogram = audio_processing.audio_to_spectrogram('temp.wav')
    result = predict_covid.make_fast_prediction(spectrogram, model)
    wav_file.close()
    if os.path.exists(temp_filename):
        os.remove(temp_filename)
    else:
        print("The file does not exist")
    return str(result)




@make_prediction_blueprint.route('/accurate_prediction',methods=['POST'])
def make_accurate_prediction():
    spectrograms = []
    encoded_strings = request.json['data']
    for encoded_string in encoded_strings:
        print("IN LOOP")
        temp_filename = "temp.wav"
        wav_file = open(temp_filename, "wb")
        decoded_string = base64.b64decode(encoded_string)
        wav_file.write(decoded_string)
        spectrogram = audio_processing.audio_to_spectrogram('temp.wav')
        spectrograms.append(spectrogram)
        wav_file.close()
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
        else:
            print("The file does not exist")
    result = predict_covid.make_accurate_prediction(spectrograms,model)


    return str(result)