import numpy as np

def make_fast_prediction(spectrogram, model):
    #Reshape spectrogram for prediction
    reshaped_spectrogram = np.reshape(spectrogram, (1, spectrogram.shape[0], spectrogram.shape[1], 1))
    prediction = model.predict(reshaped_spectrogram)
    return prediction

def make_accurate_prediction(spectrograms, model):
    predictions = []
    for spectrogram in spectrograms:
        # Reshape spectrogram for prediction
        reshaped_spectrogram = np.reshape(spectrogram, (1, spectrogram.shape[0], spectrogram.shape[1], 1))
        prediction = model.predict(reshaped_spectrogram)
        predictions.append(prediction)

    #List of all predictions for each spectrogram
    predictions = np.array(predictions)
    #Get mean of each column
    final_prediction = np.mean(predictions, axis=0)
    return final_prediction


