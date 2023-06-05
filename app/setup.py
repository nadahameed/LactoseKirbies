from db.sql import query_db
import db.user as userdb

def createTable():
  query_db("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, pong_high INT, dino_high INT, crossy_high INT, time FLOAT)")

createTable()

"""
# Testing Backend User
print(userdb.username_in_system("Fang"))
print(userdb.signup("Fang", "Password"))
print(userdb.username_in_system("Fang"))
print(userdb.login("Fang", "Pass"))
print(userdb.login("Fang", "Password"))
print(userdb.remove_user("Fang"))
print(userdb.username_in_system("Fang"))
"""