# Hacks
import sys

sys.path.append("..")

from flask import Blueprint, render_template, request, session

# Create the blueprint
crossyroad_bp = Blueprint('crossyroad', __name__)


@crossyroad_bp.route("/crossyroad")
def home(*args, **kwargs):
    # Fetch the user from the database

    if "username" in session:
        return render_template("crossyroad.html")
    else:
        return render_template("login.html")
        
    #return render_template('landing.html')
