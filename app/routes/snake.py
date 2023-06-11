# Hacks
import sys

sys.path.append("..")

from flask import Blueprint, render_template, request, session

# Create the blueprint
snake_bp = Blueprint('snake', __name__)


@home_bp.route("/snake")
def snake(*args, **kwargs):
    # Fetch the user from the database

    if "username" in session:
        return render_template("snake.html")
    else:
        return render_template("login.html")
        
    #return render_template('landing.html')
