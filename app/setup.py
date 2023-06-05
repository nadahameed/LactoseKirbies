from db.sql import query_db

def createTables():
    query_db("CREATE TABLE IF NOT EXISTS players (user TEXT, pass TEXT, pong_high INT, dino_high INT, crossy_high INT, time FLOAT)")

createTables()