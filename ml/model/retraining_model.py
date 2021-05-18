from ml.data import dataset
import datetime as dt
import numpy as np
from ml.model import log
import random

def retraining_pipeline(date=dt.datetime.utcnow()):
    # Get data
    data = list(dataset.get_all_data(date))
    random.shuffle(data)
    # Number of training points
    current_training_size = len(data)

    # Transform into two arrays
    labels = np.array([datapoint['label'] for datapoint in data])
    # Retrieving all spectrograms and reshaping them to numpy arrays
    spectrograms = np.reshape(
        np.array([np.frombuffer(datapoint['spectrogram'], dtype=np.float32) for datapoint in data]), (-1, 1025, 69))
    print('shape: ',spectrograms.shape)

    # Check if balanced
    positive_recordings = np.count_nonzero(labels)
    negative_recordings = current_training_size - positive_recordings
    print('pos: ',positive_recordings)
    print('neg: ',negative_recordings)

    THRESHOLD =40
    difference = abs(positive_recordings - negative_recordings)
    if (difference> THRESHOLD):
        print('Not balanced dataset')
        #Make it balanced
        numbr_of_points_to_be_removed = difference - THRESHOLD

        #Which labels to remove
        if(positive_recordings>negative_recordings):
            label_to_remove = 1
        else:
            label_to_remove = 0

        #Remove from dataset
        for i,label in enumerate(labels):
            if(labels[i] == label_to_remove):
                labels = np.delete(labels,i,axis=0)
                spectrograms = np.delete(spectrograms,i,axis=0)
                numbr_of_points_to_be_removed -=1
            if(numbr_of_points_to_be_removed == 0):
                break
    print('Balanced dataset')
    #Update current training size
    current_training_size = labels.shape[0]


    # Check if enough data
    # Extract previous model's training size
    previous_training_size = log.getSizeFromLogs()
    # Compare new size with old size and check if enough
    print('Number of new datapoints: ', (current_training_size - previous_training_size))
    if(current_training_size - previous_training_size < 30):
        print('Not enough new data')
        return
    print('Enough new data ...')


    # import train model and train the model
    print('Initiating retraining ...')
    from ml.model import train_model
    # Reshaping spectrograms for training
    spectrograms = np.reshape(spectrograms, (spectrograms.shape[0], spectrograms.shape[1], spectrograms.shape[2], 1))
    train_model.create_model(spectrograms,labels)
    print('Retraining done ...')
    return 'TRAINED'


if __name__ == "__main__":
    retraining_pipeline()
