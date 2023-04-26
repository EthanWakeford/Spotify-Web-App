"""functions for creating different spotify api tokens
create_token can be used for most processes, but to login as a user you need
to use auth_token"""

from os import getenv
import json
import requests
import webbrowser
from urllib.parse import urlencode
import base64

def create_token(*args):
    """Creates a spotify token from given envrionment variables
    args are the scopes to be passed to the created token"""

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


def create_auth_code(*args):
    """ Creates a spotify authorization code and an access token,
    args are the scopes passed to the auth code"""
    
    # first we create an authorization code
    client_id = getenv('CLIENT_ID')
    url = 'https://accounts.spotify.com/authorize'
    auth_headers = {
        'client_id': client_id,
        'response_type': 'code',
        'redirect_uri': 'http://localhost:3000',
        'scope': 'user-read-private user-read-email'
    }
    # maybe add a state scope if this is ever used for anything beyond myself
    webbrowser.open("https://accounts.spotify.com/authorize?" + urlencode(auth_headers))

    return 'asdf'

def create_auth_token(auth_code):
    """gets a spotift token using an authorization code"""
    client_id = getenv('CLIENT_ID')
    client_secret = getenv('CLIENT_SECRET')

    encoded_credentials = base64.b64encode(client_id.encode() + b':' + client_secret.encode()).decode("utf-8")

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
    print('code here:   ' + auth_code)
    r = requests.post(url, headers=headers, data=data)
    print(json.loads(r.text).get('access_token'))
    # return json.loads(r.text)['access_token']

    return json.loads(r.text).get('access_token')

