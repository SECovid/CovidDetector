from tensorflow.keras import Sequential, layers
#TODO: Change them and make them automatic / maybe env variables
FREQ_BINS = 1025
TIME_PERIODS = 69

def create_model(training_data, training_labels):
    model = Sequential()
    model.add(
        layers.Conv2D(
            32,
            (2, 2),
            activation='relu',
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


    model.save('./CNN_COUGH_COVID_DETECTOR_MODEL_tf', save_format='tf')