import psycopg2
from backend import config

con = psycopg2.connect(database="covid_detector", user="postgres", password=config.DB_PASS, host="127.0.0.1",
                       port="5432")


def get_user(email):
    cur = con.cursor()
    cur.execute(f'SELECT * from "User" WHERE email=\'{email}\'')
    rows = cur.fetchall()
    return rows


def get_admin(username):
    cur = con.cursor()
    cur.execute(f'SELECT * from "Admin" WHERE username=\'{username}\'')
    rows = cur.fetchall()

    return rows


def add_user(data):
    cur = con.cursor()
    cur.execute(
        f'INSERT INTO "User" (user_id, first_name, last_name, date_of_birth, gender, country, address, email, password) VALUES (DEFAULT, \'{data["first_name"]}\', \'{data["last_name"]}\', \'{data["date_of_birth"]}\', \'{data["gender"]}\', \'{data["country"]}\', \'{data["address"]}\', \'{data["email"]}\', \'{data["password"]}\')');
    con.commit()


def add_covid_report(data):
    print('DATA ', data)
    cur = con.cursor()
    cur.execute(
        f'INSERT INTO "Covid_Report" (report_id,user_id,date,covid_percentage,travel_abroad_14days,contact_with_infected_person_14days,visited_healthcare_facility_14days,tested_positive_14days,fever,breathing_difficulty,sore_throat,cough,no_taste,no_smell,headache) VALUES (DEFAULT, \'{data["user_id"]}\', \'{data["date"]}\', \'{data["covid_percentage"][1]}\', \'{data["travel_abroad_14days"]}\', \'{data["contact_with_infected_person_14days"]}\', \'{data["visited_healthcare_facility_14days"]}\',\'{data["tested_positive_14days"]}\', \'{data["fever"]}\', \'{data["breathing_difficulty"]}\', \'{data["sore_throat"]}\', \'{data["cough"]}\', \'{data["no_taste"]}\',\'{data["no_smell"]}\', \'{data["headache"]}\')');
    con.commit()



def get_all_covid_reports():
    cur = con.cursor()
    cur.execute(f'SELECT covid_percentage from "Covid_Report"')
    rows = cur.fetchall()
    return rows

def get_covid_reports(id):
    cur = con.cursor()
    cur.execute(f'SELECT * from "Covid_Report" WHERE user_id=\'{id}\'')
    rows = cur.fetchall()
    return rows


def get_covid_factor(factor):
    cur = con.cursor()
    cur.execute(f'SELECT covid_percentage from "Covid_Report" WHERE {factor}=\'true\'')
    ifTrue = cur.fetchall()

    cur = con.cursor()
    cur.execute(f'SELECT covid_percentage from "Covid_Report" WHERE {factor}=\'false\'')
    ifFalse = cur.fetchall()

    return ifTrue, ifFalse


def get_covid_country():
    cur = con.cursor()
    cur.execute(f'SELECT covid_percentage,country from "Covid_Report" INNER JOIN "User" ON "User".user_id="Covid_Report".user_id ;')
    rows = cur.fetchall()
    return rows


def get_covid_time():
    cur = con.cursor()
    cur.execute(f'SELECT date,covid_percentage from "Covid_Report"')
    rows = cur.fetchall()
    return rows
