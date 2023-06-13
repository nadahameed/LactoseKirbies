# Hacks
import sys

sys.path.append("..")

from flask import Blueprint, render_template, request, session

# Create the blueprint
home_bp = Blueprint('home', __name__)


@home_bp.route("/")
def home(*args, **kwargs):
    # Fetch the user from the database

    if "username" in session:
        return render_template("home.html", name=session["username"])
    else:
        return render_template("login.html")
