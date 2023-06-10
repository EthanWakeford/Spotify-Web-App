"""different functions to get info about users"""

import requests
from spotify.token import create_auth_token, create_token, create_auth_code, refresh_auth
import json


def get_user():
    """querys the spotify api to retrive user info"""

    token = create_token()
    url = 'https://api.spotify.com/v1/users/223tihi7zuc4xc2d4ppsg6d7i'

    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})
    return r.text


def get_me(auth_code, refresh_token):
    """gets info about current user, uses auth code and acesses private info, 
    uses refresh token if available, otherwise creates a new token/refresh token"""
    if refresh_token != 'null':
        tokens = refresh_auth(refresh_token)
    else:
        tokens = create_auth_token(auth_code)
    access_token = tokens.get('access_token')
    refresh_token = tokens.get('refresh_token')

    url = 'https://api.spotify.com/v1/me'
    r = requests.get(url, headers={'Authorization': f'Bearer {access_token}'})

    return_package = {'refresh_token': refresh_token, 'response': r.text}
    return json.dumps(return_package)
