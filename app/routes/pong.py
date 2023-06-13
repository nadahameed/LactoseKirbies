# Hacks
import sys

sys.path.append("..")

from flask import Blueprint, render_template, request, session

# Create the blueprint
pong_bp = Blueprint('pong', __name__)


@pong_bp.route("/pong")
def home(*args, **kwargs):
    # Fetch the user from the database

    if "username" in session:
        return render_template("pong.html")
    else:
        return render_template("login.html")
