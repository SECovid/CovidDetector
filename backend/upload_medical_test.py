from flask import Blueprint
from ml.spectogram import audio_processing
from ml.data import add_medical_test
from flask import Flask, request, jsonify
import base64
import os
import json

upload_medical_test_blueprint = Blueprint('upload_medical_test', __name__)

@upload_medical_test_blueprint.route('/upload_medical_test',methods=['POST'])
def upload_medical_test():
    try:
        encoded_string = request.json['data']
        test_result = request.json['test_result']


        temp_filename = "temp.wav"
        wav_file = open(temp_filename, "wb")
        decoded_string = base64.b64decode(encoded_string)
        wav_file.write(decoded_string)

        add_medical_test.add_medical_test_to_dataset(temp_filename,test_result)


        wav_file.close()
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
        else:
            print("The file does not exist")

        return json.dumps({"results": "success"})
    except:
        return json.dumps({"result": "failed" })



