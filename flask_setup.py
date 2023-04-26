#!/usr/bin/python3
""" runs a flask server """
from flask import Flask, render_template, make_response, request
import spotify

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


@app.route('/api/users', methods=['GET'])
def user():
    """gets user data"""
    return spotify.user.get_user()


@app.route('/api/me/<auth_code>', methods=['GET'])
def me(auth_code=''):
    """gets info about current user"""
    return spotify.user.get_me(auth_code)


@app.route('/api/log_in', methods=['GET'])
def log_in():
    """logs the user into spotfys api"""
    return spotify.token.create_auth_code('user-read-private', 'user-read-email')


@app.route('/api/artists', methods=['GET'])
def artist():
    """gets artist data"""
    return spotify.artist.get_artist()


@app.route('/api/recommendations', methods=['GET'])
def recommendations():
    """gets recommendations"""
    return spotify.recommendation.get_recommendations()


if __name__ == "__main__":
    """ Main Function """
    app.run(host='localhost', port=3000)
