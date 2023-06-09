import db.user as userdb 
import db.sql as db
from flask import Flask, request, jsonify, render_template

from routes.home import home_bp
from routes.login import login_bp
from routes.logout import logout_bp
from routes.register import register_bp
from routes.crossyroad import crossyroad_bp
from routes.pong import pong_bp
from routes.snake import snake_bp

from tools import b64
import db.user as userdb

app = Flask(__name__, static_url_path='/static')

app.register_blueprint(home_bp)
app.register_blueprint(login_bp)
app.register_blueprint(logout_bp)
app.register_blueprint(register_bp)
app.register_blueprint(crossyroad_bp)
app.register_blueprint(pong_bp)
app.register_blueprint(snake_bp)

app.secret_key = b64.base64_encode(
    "very good secret key. it's really secure now that we encoded it into base64!")

userdb.createTable("users") # DO NOT CHANGE THIS TABLE NAME

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
