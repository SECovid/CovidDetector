import json
import datetime as dt
def modelLogs(history,size):

    today = dt.date.today()
    d1 = today.strftime("%d-%m-%Y")

    data = {}
    data['date'] =  d1
    data['training_size'] = size
    data['accuracy'] = history.history['accuracy']
    data['loss'] = history.history['loss']
    #Choose a more meaningful name (Maybe more than one training per day)
    with open('logs/'+d1+'.json', 'w') as outfile:
        json.dump(data, outfile)


if __name__ == '__main__':
    modelLogs(None,None)