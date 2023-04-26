"""different functions to get info about users"""

import requests
from spotify.token import create_auth_token, create_token, create_auth_code

def get_user():
    """querys the spotify api to retrive user info"""

    token = create_token()
    url = 'https://api.spotify.com/v1/users/223tihi7zuc4xc2d4ppsg6d7i'

    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})
    return r.text

def get_me(auth_code):
    """gets info about current user, uses auth code and acesses private info"""
    token = create_auth_token(auth_code)

    url = 'https://api.spotify.com/v1/me'
    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})
    return r.text
