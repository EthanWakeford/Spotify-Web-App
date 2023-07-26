"""functions for creating different spotify api tokens
create_token can be used for most processes, but to login as a user you need
to use auth_token"""

from flask import redirect
from os import getenv
import json
import requests
from urllib.parse import urlencode
import base64


def create_token():
    """Creates a spotify access token from given envrionment variables"""

    client_id = getenv('CLIENT_ID')
    client_secret = getenv('CLIENT_SECRET')
    url = "https://accounts.spotify.com/api/token"
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    }

    r = requests.post(url, headers=headers, data=data)

    # read from response, convert from json, get access_token
    return json.loads(r.text)['access_token']


def create_auth_code(scopes):
    """ Creates a spotify authorization code and an access token,
    args are the scopes passed to the auth code"""

    # first we create an authorization code
    client_id = getenv('CLIENT_ID')
    auth_headers = {
        'client_id': client_id,
        'response_type': 'code',
        'redirect_uri': 'http://localhost:3000',
        'scope': scopes
    }
    # Open spotfiy page for OAuth flow

    return redirect("https://accounts.spotify.com/authorize?" + urlencode(auth_headers), code=302)
    # return redirect("https://www.google.com/", code=302)


def create_auth_token(auth_code):
    """gets a spotify token using an authorization code"""
    client_id = getenv('CLIENT_ID')
    client_secret = getenv('CLIENT_SECRET')

    encoded_credentials = base64.b64encode(
        client_id.encode() + b':' + client_secret.encode()).decode("utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + encoded_credentials,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "authorization_code",
        "code": auth_code,
        "redirect_uri": "http://localhost:3000"
    }

    r = requests.post(url, headers=headers, data=data)

    access_token = json.loads(r.text).get('access_token')
    refresh_token = json.loads(r.text).get('refresh_token')

    return {'access_token': access_token, 'refresh_token': refresh_token}


def refresh_auth(refresh_token):
    """creates an access token using a refresh token from the spotify api"""
    client_id = getenv('CLIENT_ID')
    client_secret = getenv('CLIENT_SECRET')

    encoded_credentials = base64.b64encode(
        client_id.encode() + b':' + client_secret.encode()).decode("utf-8")

    url = 'https://accounts.spotify.com/api/token'
    headers = {
        "Authorization": "Basic " + encoded_credentials,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token
    }

    r = requests.post(url, headers=headers, data=data)
    access_token = json.loads(r.text).get('access_token')

    return {'access_token': access_token, 'refresh_token': refresh_token}
