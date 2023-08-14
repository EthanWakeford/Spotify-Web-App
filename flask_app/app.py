#!/usr/bin/python3
""" runs a flask server """
from flask import Flask, render_template, request, abort
from flask_cors import CORS
import spotify
import requests

app = Flask(__name__)
CORS(app)


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


@app.route('/api/redirect')
def redirect():
    """handles spotify Oauth redirect"""
    print("redirecting")
    auth_code = request.args.get('code')
    try:
        return spotify.user.get_me_init(auth_code)
    except requests.exceptions.HTTPError:
        abort(400)


@app.route('/api/users', methods=['GET'])
def user():
    """gets user data"""
    return spotify.user.get_user()


@app.route('/api/me/', methods=['GET'])
def me():
    """gets info about current user"""
    auth_code = request.args.get('authCode')
    refresh_token = request.args.get('refreshToken')
    try:
        return spotify.user.get_me(auth_code, refresh_token)
    except requests.exceptions.HTTPError:
        abort(400)


@app.route('/api/log_in', methods=['GET'])
def log_in():
    """logs the user into spotfys api, scopes get added from url parameters"""
    scopes = request.args.get('scopes')

    return spotify.token.create_auth_code(scopes)


@app.route('/api/artists', methods=['GET'])
def artist():
    """gets artist data"""
    return spotify.artist.get_artist()


@app.route('/api/recommendations', methods=['GET'])
def recommendations():
    """gets recommendations"""
    url_args = {}
    for key, value in request.args.items():
        url_args[key] = value
    return spotify.recommendation.get_recommendations(**url_args)


@app.route('/api/searcher', methods=['GET'])
def searcher():
    """uses the spotify searcher"""
    url_args = {}
    for key, value in request.args.items():
        url_args[key] = value
    if 'type' in url_args:
        url_args['type'] = url_args['type'].split(',')

    return spotify.search.search(**url_args)


@app.route('/api/create_playlist', methods=['POST'])
def create_playlist():
    """creates a user playlist"""
    content = request.json
    refresh_token = content['token']
    playlist_name = content['name']
    user_id = content['user_id']
    song_uris = content['song_uris']
    return spotify.playlist.create_playlist(refresh_token, playlist_name, user_id, song_uris)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='localhost', port=3000)
