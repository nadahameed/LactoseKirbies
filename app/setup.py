from db.sql import query_db
import db.user as userdb

def createTable(tblName):
  query_db(f"CREATE TABLE IF NOT EXISTS {tblName} (username TEXT, password TEXT, pong_high INT, dino_high INT, crossy_high INT, time FLOAT)")

def deleteTable(tblName):
  query_db(f"DROP TABLE IF EXISTS {tblName}")

createTable("users") # DO NOT CHANGE THIS TABLE NAME

"""
# Testing Backend User
print(userdb.username_in_system("Fang")) #F
print(userdb.signup("Fang", "Password")) #T
print(userdb.username_in_system("Fang")) #T
print(userdb.login("Fang", "Pass")) #F
print(userdb.login("Fang", "Password")) #T
print(userdb.edit_username("Fang", "Nada")) # None
print(userdb.remove_user("Nada")) #T
print(userdb.username_in_system("Fang")) #F
print(userdb.username_in_system("Fang")) #F
"""