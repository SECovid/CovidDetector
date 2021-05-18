import unittest
from tensorflow import keras
from ml.spectogram import audio_processing
from ml.prediction import predict_covid
from ml.data import dataset
import time
reconstructed_model = keras.models.load_model('ml/model/trained_model/CNN_COUGH_COVID_DETECTOR_MODEL_tf')


class TestModel(unittest.TestCase):

    #Test results
    def test_results(self):
        wname = 'project_test/test1Covid.wav'
        spectrogram = audio_processing.audio_to_spectrogram(wname)
        modelResult = predict_covid.make_fast_prediction(spectrogram, reconstructed_model)
        self.assertGreater(modelResult[0][0],0.6)


    #Test prediction time
    def test_time(self):
        wname = 'project_test/test1Covid.wav'
        spectrogram = audio_processing.audio_to_spectrogram(wname)
        start = time.time()
        modelResult = predict_covid.make_fast_prediction(spectrogram, reconstructed_model)
        end = time.time()
        print(end - start)
        #Should be less than 4 seconds
        self.assertLess((end-start),4)

    #Test dataset size
    def test_dataset_size(self):
        size = dataset.get_all_data_size()
        self.assertGreater(size,0)

    #Test audio preprocessing
    def test_audio_preprocessing(self):
        wname = 'project_test/test1Covid.wav'
        spectrogram = audio_processing.audio_to_spectrogram(wname)
        print('Size ',spectrogram.shape)
        self.assertEqual(spectrogram.shape,(1025,69))




if __name__ == "__main__":
    unittest.main()
