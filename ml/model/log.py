import json
import datetime as dt
def modelLogs(history,size):

    today = dt.date.today()
    d1 = today.strftime("%d-%m-%Y")

    data = {}
    data['people'] = []
    data['people'].append({
        'name': 'Scott',
        'website': 'stackabuse.com',
        'from': 'Nebraska'
    })
    data['people'].append({
        'name': 'Larry',
        'website': 'google.com',
        'from': 'Michigan'
    })
    data['people'].append({
        'name': 'Tim',
        'website': 'apple.com',
        'from': 'Alabama'
    })

    #Choose a more meaningful name (Maybe more than one training per day)
    with open('logs/'+d1+'.json', 'w') as outfile:
        json.dump(data, outfile)


if __name__ == '__main__':
    modelLogs(None,None)