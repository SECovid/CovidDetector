
from ml.spectogram import audio_processing



wname = 'charbel.wav'

spectrogram = audio_processing.audio_to_spectrogram(wname)
audio_processing.plot_spectrogram(spectrogram)

