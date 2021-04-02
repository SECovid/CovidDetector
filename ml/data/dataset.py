from pymongo import MongoClient
import datetime as dt
cluster = MongoClient("mongodb+srv://dbUser:coughdetectoracg@softwareengineeringcovi.qbeqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = cluster["CovidDetector"]
collection = db["CoughDataset"]

#Get all data to a specific date
def get_all_data(date = '01/01/1970'):
    data = collection.find_one()#Should be replaced with find all and based on date
    #today = dt.date.today() + dt.timedelta(days=1)
    # dd/mm/YY
    #d1 = today.strftime("%d/%m/%Y")
    #print(d1)
    #print(data['date'])
    #print(dt.datetime.strptime(d1,"%d/%m/%Y")<dt.datetime.strptime(data['date'],"%d/%m/%Y"))
    return data
#Insert a data point
def insert_data(spectrogram, medical_test_result, date):
    # date should be in dd/mm/YY
    datapoint = {"date": date, "label": medical_test_result, "spectrogram": spectrogram.tostring()}
    collection.insert_one(datapoint)
    pass

#Delete a specific data point
def delete_data():
    #Should make it more meaningful
    collection.delete_one({"something":"something"})
    pass

#Delete all data from a specific date till now
def delete_data_from_data_to_present(date):
    #Needs testing
    collection.remove({"date":{"$lte":date}})
    pass


if __name__ == '__main__':
    get_all_data()
