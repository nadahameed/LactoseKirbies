# Hacks
import sys
import db.user as userdb 

sys.path.append("..")

from flask import Blueprint, render_template, request, session

# Create the blueprint
crossyroad_bp = Blueprint('crossyroad', __name__)


@crossyroad_bp.route("/crossyroad")
def home(*args, **kwargs):
    # Fetch the user from the database

    if "username" in session:
        hs = userdb.getScore("crossy_high", session["username"])
        return render_template("crossyroad.html", hs=hs)
    else:
        return render_template("login.html")
