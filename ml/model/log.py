import json
import datetime as dt
def modelLogs(history,size):

    currentTime = dt.datetime.now()
    fileDate = currentTime.strftime("%d-%m-%Y-%H-%M-%S")

    data = {}
    data['date'] =  fileDate
    data['training_size'] = size
    data['accuracy'] = history.history['accuracy']
    data['loss'] = history.history['loss']
    #Choose a more meaningful name (Maybe more than one training per day)
    with open('logs/'+fileDate+'.json', 'w') as outfile:
        json.dump(data, outfile)

def getSizeFromLogs():
    import glob
    import os
    #Get latest logs
    list_of_files = glob.glob('logs/*.json')  # * means all if need specific format then *.csv
    latest_file = max(list_of_files, key=os.path.getctime)
    print(latest_file)

    with open(latest_file) as json_file:
        data = json.load(json_file)
        return data['training_size']

if __name__ == '__main__':
    modelLogs(None,None)