import numpy as np

NOISE_THRESHOLD = 0.55
OUTLIER_TOLERANCE = 3
COUGH_ALIGNMENT_NUMBER_OF_PERIODS = 7
COUGH_LENGTH = 69
#Loop through all pixels of the spectrogram and remove noise based on NOISE_THRESHOLD
def remove_noise(spectrogram):
    for i,row in enumerate(spectrogram):
        for j,pixel in enumerate(row):
          if(pixel<NOISE_THRESHOLD):
            spectrogram[i][j] = 0
    return spectrogram

#Remove outliers from spectrogram
def remove_outliers(spectrogram):
    #Get mean and standard deviation of all pixels of spectrogram
    mean =  spectrogram.mean()
    std = spectrogram.std()

    tolerance = OUTLIER_TOLERANCE
    #Loop through all pixels of the spectrogram and remove outliers
    for i,row in enumerate(spectrogram):
        for j,pixel in enumerate(row):
          if(pixel<mean - tolerance*std or pixel>mean+tolerance*std):
            spectrogram[i][j] = 0
    return spectrogram

def find_cough_start(spectrogram):
    transposed_array = np.transpose(spectrogram)
    counter = 0
    number_of_periods = COUGH_ALIGNMENT_NUMBER_OF_PERIODS

    for i,row in enumerate(transposed_array):
        #If frequency band at time i has less than 100 non zero elements (Indicating no cough)
        if(np.count_nonzero(row)<100):
          counter = 0
        else:
          counter += 1

        #If enough consecutive time periods have indications of a cough
        if(counter == number_of_periods):
          return i-number_of_periods+1

    return 0

def fix_cough_length(spectrogram):
    #If longer than cough length: TRIM
    if(spectrogram.shape[1]>COUGH_LENGTH):
        print("Long")
        return spectrogram[:, 0:COUGH_LENGTH]
    #IF smaller than cough length extend with silent bands
    elif(spectrogram.shape[1]<COUGH_LENGTH):
        print("Short")

        number_of_needed_silent_columns = COUGH_LENGTH - spectrogram.shape[1]
        silent_columns = np.zeros((spectrogram.shape[0], number_of_needed_silent_columns))
        spectrogram = np.append(spectrogram, silent_columns, axis=1)
        return spectrogram
    # If correct length: Do nothing
    else:
        return spectrogram

def normalize_cough(spectrogram):
    normalized_spectrogram = (spectrogram - np.amin(spectrogram)) / (np.amax(spectrogram) - np.amin(spectrogram))
    return normalized_spectrogram

def preprocess_cough(spectrogram):
    #Removing outliers
    no_outliers_spectrogram = remove_outliers(spectrogram)

    #Normalize spectrogram
    normalized_spectrogram = normalize_cough(no_outliers_spectrogram)

    #Remove noise
    no_noise_spectrogram = remove_noise(normalized_spectrogram)

    #Get cough start index using the no noise spectrogram
    cough_start_index = find_cough_start(no_noise_spectrogram)

    #Align original spectrogram
    aligned_spectrogram = normalized_spectrogram[:, cough_start_index:]

    #Fix cough length
    final_spectrogram = fix_cough_length(aligned_spectrogram)

    return final_spectrogram