from .sql import query_db

# tblName = users

def createTable(tblName):
  query_db(f"CREATE TABLE IF NOT EXISTS {tblName} (username TEXT, password TEXT, pong_high INT, dino_high INT, crossy_high INT, time FLOAT)")

def deleteTable(tblName):
  query_db(f"DROP TABLE IF EXISTS {tblName}")

# general method that can be used to get data easier
def select_from(data_want, datagive, datalabel_give):
    temp = query_db(f"SELECT {data_want} FROM users WHERE {datalabel_give} = ?", (datagive,), all=True)
    if(len(temp) > 0):
        return temp[0][0]
    else:
        return 0

def username_in_system(username):
    temp = query_db("SELECT username FROM users", all=True)
    for element in temp:
        for element2 in element:
            if username == element2:
                return True
    return False

def signup(username, password):
    if(username_in_system(username)):
        return False
    else:
        query_db("INSERT INTO users VALUES (?,?, 0, 0, 0, 0)", (username, password), commit=True)
    return True #save changes

# this method is prob not needed but we can add a feature for deleting account or smth
def remove_user(username):
    try:
        query_db(f"DELETE FROM users WHERE username = ?", (username,), commit=True)
        return True
    except:
        return False
    
# to verify if the password given is right to login
def login(username, password):
    if(username_in_system(username)):
        if(select_from("users", "password", username, "username") == password):
            return True
    return False

def edit_username(old_username, username):
    query_db(f"UPDATE users SET username = ? WHERE username = ?", (username, old_username), commit=True)

def updateScore(datagive, datalabel_give, username):
    query_db(f"UPDATE users SET {datalabel_give} = {datagive} WHERE username = {username}")

def getScore(data_want, username):
    return select_from(data_want, username, "username")