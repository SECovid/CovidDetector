from tensorflow import keras
from ml.spectogram import audio_processing
from ml.prediction import predict_covid

reconstructed_model = keras.models.load_model("MyModelNormalized_tf")
wname = 'charbel.wav'

spectrogram = audio_processing.audio_to_spectrogram(wname)
print(predict_covid.make_fast_prediction(spectrogram,reconstructed_model))