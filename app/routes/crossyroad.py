# Hacks
import sys

sys.path.append("..")

from flask import Blueprint, render_template, request, session

# Create the blueprint
crossy_bp = Blueprint('crossyroad', __name__)


@crossy_bp.route("/crossy")
def home(*args, **kwargs):
    # Fetch the user from the database

    if "username" in session:
        return render_template("crossyroad.html")
    else:
        return render_template("login.html")
        
    #return render_template('landing.html')
