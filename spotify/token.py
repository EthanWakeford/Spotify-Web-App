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
    if args:
        data['scope'] = ' '.join(args)

    r = requests.post(url, headers=headers, data=data)

    # read from response, convert from json, get access_token
    return json.loads(r.text)['access_token']


def create_auth_token(*args):
    """ Creates a spotify authorization code and an access token,
    args are the scopes passed to the auth code"""
    pass
    # first we create an authorization code
"""    client_id = getenv('CLIENT_ID')
    if args:
        scope = ' '.join(args)
    url = 'https://accounts.spotify.com/authorize'
    auth_headers = {
        'client_id': client_id,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': 'http://localhost:3000'
    }
    # maybe add a state scope if this is ever used for anything beyond myself
    
    webbrowser.open("https://accounts.spotify.com/authorize?" + urlencode(auth_headers))

    #auth_code = json.loads(r.text)['code']

    # Now we create an access token with the auth code
    return 'asdf'"""

if __name__ == '__main__': 
    create_token()
