from backend import database
from statistics import mean
def getFactorStatistics(factor):
    ifTrue, ifFalse = database.get_covid_factor(factor)
    ifTrue = [item for t in ifTrue for item in t]
    ifFalse = [item for t in ifFalse for item in t]
    if len(ifTrue) != 0:
        ifTrue = mean(ifTrue)
    else:
        ifTrue = 0
    if len(ifFalse) != 0:
        ifFalse = mean(ifFalse)
    else:
        ifFalse = 0
    return ifTrue,ifFalse

def getStatisticsTime():
    covidTime = database.get_covid_time()
    return covidTime


def getCountryStatistics():
    covidCountry = database.get_covid_country()

    return covidCountry