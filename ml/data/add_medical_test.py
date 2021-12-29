from ml.spectrogram import audio_processing
from ml.model import retraining_model
from ml.data import dataset
import datetime as dt
def add_medical_test_to_dataset(audio_wav, medical_test_result, date = dt.datetime.utcnow()):
    spectrogram = audio_processing.audio_to_spectrogram(audio_wav)

    ##Add to nosql db
    dataset.insert_data(spectrogram, medical_test_result, date)

    ##Check for retraining
    retraining_model.retraining_pipeline()