import psycopg2
from backend import config

con = psycopg2.connect(database="covid_detector", user="postgres", password=config.DB_PASS, host="127.0.0.1", port="5432")

def get_user(email):
    cur = con.cursor()
    cur.execute(f'SELECT * from "User" WHERE email=\'{email}\'')
    rows = cur.fetchall()
    return rows


def get_admin(username):
    cur = con.cursor()
    cur.execute(f'SELECT * from "User" WHERE username=\'{username}\'')
    rows = cur.fetchall()

    return rows

def add_user(data):
    cur = con.cursor()
    print('adding user')
    cur.execute(
        f'INSERT INTO "User" (user_id, first_name, last_name, date_of_birth, gender, country, address, email, password) VALUES (DEFAULT, \'{data["first_name"]}\', \'{data["last_name"]}\', \'{data["date_of_birth"]}\', \'{data["gender"]}\', \'{data["country"]}\', \'{data["address"]}\', \'{data["email"]}\', \'{data["password"]}\')');
    con.commit()

