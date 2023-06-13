import sqlite3 

def get_connection():
  conn = sqlite3.connect("app/db/milk.db", check_same_thread=False)
  return conn


def query_db(query, args=(), all=False, execute_many=False, commit=False):
  conn = get_connection()

  with conn:
    cur = conn.cursor()
    if execute_many:
        r = cur.executemany(query, args)
    else:
        r = cur.execute(query, args)
    r = cur.fetchall()

  if commit:
    conn.commit()

  conn.close()
  return (r[0] if r else None) if not all else r

def add_score(user, game, score):
  c = db.cursor()
  c.execute("select game from users where (user=?)")
  newScore = float(c.fetchone())
  newScore += score
  c.execute("REPLACE INTO table(game) where username=user VALUES(score)")
  db.commit()
  c.close()

