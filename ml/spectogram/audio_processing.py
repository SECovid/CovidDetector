import librosa
import numpy as np
import matplotlib.pyplot as plt

from .preprocessing import preprocess_cough

FRAME_SIZE = 2048
HOP_SIZE = 512
##Default sampling rate
SR = 22050

def audio_to_spectrogram(audio_wav):

    aud, sr = librosa.load(audio_wav, sr=SR)
    scale = librosa.stft(aud, n_fft=FRAME_SIZE, hop_length=HOP_SIZE)
    spectrogram = np.abs(scale) ** 2
    db_spectrogram = librosa.power_to_db(spectrogram)

    #Preprocess spectrogram
    preprocessed_spectrogram = preprocess_cough(db_spectrogram)
    return preprocessed_spectrogram



def plot_spectrogram(Y, sr, hop_length, y_axis='linear'):
  plt.figure(figsize=(25,10))
  librosa.display.specshow(Y,sr=sr,hop_length=hop_length,x_axis="time",y_axis=y_axis)
  plt.colorbar(format="%+2.f")
  #plt.show()
