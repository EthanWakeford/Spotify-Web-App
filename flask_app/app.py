#!/usr/bin/python3
""" runs a flask server """
from flask import Flask, request, abort
from flask_cors import CORS
import spotify

app = Flask(__name__)
CORS(app)


@app.route('/')
def api():
    """returns info about api usage"""
    return """
This is my api, there are many like it but this one is mine
Usage:
    GET /user:
        (deprecated for now) get user data
    GET /artist:
        (deprecated for now) get artist data
    GET /me/?refreshToken='':
        gets info about the user
    GET /login:
        begins spotify oauth flow. redirects you
    GET /recommendations:
        gets recommendations from spotify using url params
    GET /searcher:
        searches for tracks or artists
    POST /create_playlist:
        creates a playlist
    GET /redirect:
        handles spotify Oauth redirect
"""


@app.route('/redirect')
def redirect():
    """handles spotify Oauth redirect"""
    print("redirecting")
    auth_code = request.args.get('code')

    if not auth_code:
        abort(400)

    # gets user data from spotify resource server and redirects back to
    # homepage with token and data as cookies
    return spotify.user.handle_redirect(auth_code)


@app.route('/users', methods=['GET'])
def user():
    """gets user data"""
    return spotify.user.get_user()


@app.route('/me/', methods=['GET'])
def me():
    """gets info about current user"""
    refresh_token = request.args.get('refreshToken')

    return spotify.user.get_me(refresh_token)


@app.route('/log_in', methods=['GET'])
def log_in():
    """logs the user into spotfys api, scopes get added from url parameters"""
    scopes = request.args.get('scopes')

    return spotify.token.create_auth_code(scopes)


@app.route('/artists', methods=['GET'])
def artist():
    """gets artist data"""
    return spotify.artist.get_artist()


@app.route('/recommendations', methods=['GET'])
def recommendations():
    """gets recommendations"""
    url_args = {}
    for key, value in request.args.items():
        url_args[key] = value
    return spotify.recommendation.get_recommendations(**url_args)


@app.route('/searcher', methods=['GET'])
def searcher():
    """uses the spotify searcher"""
    url_args = {}
    for key, value in request.args.items():
        url_args[key] = value
    if 'type' in url_args:
        url_args['type'] = url_args['type'].split(',')

    return spotify.search.search(**url_args)


@app.route('/create_playlist', methods=['POST'])
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
