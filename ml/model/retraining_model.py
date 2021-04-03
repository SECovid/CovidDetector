from ml.data import dataset
import datetime as dt
import numpy as np
from ml.model import log


def retraining_pipeline(date='01/01/1970'):
    # Get data
    data = list(dataset.get_all_data(date))

    # Number of training points
    current_training_size = len(data)

    # Transform into two arrays
    labels = np.array([datapoint['label'] for datapoint in data])
    # Retrieving all spectrograms and reshaping them to numpy arrays
    spectrograms = np.reshape(
        np.array([np.frombuffer(datapoint['spectrogram'], dtype=np.float32) for datapoint in data]), (-1, 1025, 69))



    # Check if balanced
    negative_recordings = np.count_nonzero(labels)
    positive_recordings = current_training_size - negative_recordings
    THRESHOLD = 40
    if (abs(positive_recordings - negative_recordings) > THRESHOLD):
        print('Not balanced dataset')
        minimum_recordings = min(positive_recordings, negative_recordings)
        #Make it balanced
        return
    print('Balanced dataset')
    #Update current training size



    # Check if enough data
    # Extract previous model's training size
    previous_training_size = log.getSizeFromLogs()
    # Compare new size with old size and check if enough
    print('Number of new data: ', (current_training_size - previous_training_size))




    # import train model and train the model
    from ml.model import train_model
    # Reshaping spectrograms for training
    spectrograms = np.reshape(spectrograms, (spectrograms.shape[0], spectrograms.shape[1], spectrograms.shape[2], 1))
    # train_model.create_model(spectrograms,labels)
    print(spectrograms.shape)
    pass


if __name__ == "__main__":
    retraining_pipeline()
