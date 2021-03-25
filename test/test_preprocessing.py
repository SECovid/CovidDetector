from pydub import AudioSegment
from ml.spectogram import audio_processing


AudioSegment.converter = r'C:\ffmpeg\bin\ffmpeg.exe'
wname = 'charbel.wav'

spectrogram = audio_processing.audio_to_spectrogram(wname)
audio_processing.plot_spectrogram(spectrogram)

