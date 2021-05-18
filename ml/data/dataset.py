from pymongo import MongoClient
import datetime as dt
cluster = MongoClient('mongodb://localhost:27017/')
db = cluster["CovidDetector"]
collection = db["CoughDataset"]

#Get all data before a specific date
def get_all_data(date = dt.datetime.utcnow()):
    data = collection.find()
    print('GETTING ALL DATA' ,data)
    return data

def get_all_data_size(date = dt.datetime.utcnow()):
    data = collection.estimated_document_count()
    return data

#Insert a data point
def insert_data(spectrogram, medical_test_result, date = dt.datetime.utcnow()):
    datapoint = {"date": date, "label": medical_test_result, "spectrogram": spectrogram.tostring()}
    collection.insert_one(datapoint)
    pass

#Delete a specific data point
def delete_data(_id):
    #Needs testing
    collection.delete_one({"_id":_id})
    pass

#Delete all data from a specific date till now
def delete_data_from_date_to_present(date = dt.datetime.utcnow()):
    #Needs testing
    collection.remove({"date":{"$gte":date}})
    pass


if __name__ == '__main__':
    date = dt.datetime.utcnow()
    d = dt.timedelta(days=26)
    a = date - d
    data = get_all_data(a)
    print(len(list(data)))
    #delete_data_from_date_to_present('s')
