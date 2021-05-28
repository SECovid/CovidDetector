from tensorflow.keras import Sequential, layers
from ml.model import log
#TODO: Change them and make them automatic / maybe env variables
FREQ_BINS = 1025
TIME_PERIODS = 69

def create_model(training_data, training_labels):
    print('Creating new model ...')
    model = Sequential()
    model.add(
        layers.Conv2D(
            32,
            (2, 2),
            activation='relu',
            #Or training_data.shape[1], training_data.shape[2]
            input_shape=(FREQ_BINS, TIME_PERIODS, 1)
        )
    )
    model.add(layers.MaxPooling2D(2, 2))
    model.add(
        layers.Conv2D(
            64,
            (2, 2),
            activation='relu'
        )
    )
    model.add(layers.MaxPooling2D(2, 2))
    model.add(
        layers.Conv2D(
            128,
            (2, 2),
            activation='relu'
        )
    )
    model.add(layers.MaxPooling2D(2, 2))
    model.add(layers.Flatten())
    model.add(layers.Dense(512, activation='relu'))
    model.add(layers.Dense(2, activation='softmax'))
    # model.summary()

    model.compile(
        loss='sparse_categorical_crossentropy',
        optimizer='rmsprop',
        metrics=['accuracy']
    )



    history = model.fit(
        training_data,
        training_labels,
        epochs=10,
        verbose=1
    )

    print('Done training ...')
    model.save('ml/model/trained_model/CNN_COUGH_COVID_DETECTOR_MODEL_tf', save_format='tf')
    print('Model saved ...')
    #Add log file containing: Size of training data, accuracy and other metrics
    log.modelLogs(history=history,size=training_data.shape[0])
    print('Log created ...')
