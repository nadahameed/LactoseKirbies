import sqlite3
from database import user as userdb #,import database as db
from flask import Flask, request, jsonify

from routes.home import home_bp
from routes.login import login_bp
from routes.logout import logout_bp
from routes.register import register_bp
#from routes.flightinfo import flightinfo_bp

from tools import b64


app = Flask(__name__, static_url_path='/static')

app.register_blueprint(home_bp)
app.register_blueprint(login_bp)
app.register_blueprint(logout_bp)
app.register_blueprint(register_bp)
#app.register_blueprint(flightinfo_bp)

app.secret_key = b64.base64_encode(
    "very good secret key. it's really secure now that we encoded it into base64!")

user_db = sqlite3.connect("user.db", check_same_thread=False)
plane_db = sqlite3.connect("database.db", check_same_thread=False)

""" @app.before_request
def before_request():
    request.db = db """
    


if __name__ == "__main__":  # false if this file imported as module
    # enable debugging, auto-restarting of server when this file is modified
    app.debug = True
    app.run(
        # Comment out on production run
        host="0.0.0.0",
        port=5003,
    )
