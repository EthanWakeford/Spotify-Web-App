#!/usr/bin/python3
""" runs a serverside API """
from flask import Flask, render_template
import spotify
import requests
import os

app = Flask(__name__)


@app.route('/')
def home():
    """ retrieves basic html page """
    return render_template('spotify.html')

@app.route('/api')
def api():
    """returns info about api usage"""
    return """
This is my api, there are many like it but this one is mine
Usage:
    GET api/user:
        get user data
    GET api/artist:
        get artist data
"""

@app.route('/api/user', methods=['GET'])
def user():
    """gets user data"""
    return spotify.user.get_user()

@app.route('/api/artist', methods=['GET'])
def artist():
    """gets artist data"""
    return spotify.artist.get_artist()


if __name__ == "__main__":
    """ Main Function """
    app.run(host='localhost', port=3000)
