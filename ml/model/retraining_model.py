from ml.data import dataset
import datetime as dt
import numpy as np

def retraining_pipeline(date = '01/01/1970'):
    # Get data
    data = list(dataset.get_all_data(date))
    # Check if enough new data
    print(len(data))

    # Extract previous model's training size
    '''
    import json
    today = dt.date.today()
    d1 = today.strftime("%d-%m-%Y")
    with open('logs/'+d1+'.json') as json_file:
        data = json.load(json_file)
        for p in data['people']:
            print('Name: ' + p['name'])
            print('Website: ' + p['website'])
            print('From: ' + p['from'])
            print('')
    '''
    #Compare new size with old size and check if enough


    #Transform into two arrays
    labels = np.array([datapoint['label'] for datapoint in data])
    #Retrieving all spectrograms and reshaping them to numpy arrays
    spectrograms = np.reshape(np.array([np.frombuffer(datapoint['spectrogram'],dtype=np.float32) for datapoint in data]),(-1,1025,69))

    # Check if balanced



    # import train model and train the model
    from ml.model import train_model
    #Reshaping spectrograms for training
    spectrograms = np.reshape(spectrograms, (spectrograms.shape[0], spectrograms.shape[1], spectrograms.shape[2], 1))
    train_model.create_model(spectrograms,labels)
    print(spectrograms.shape)
    pass

if __name__ == "__main__":
    retraining_pipeline()