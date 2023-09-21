"""different functions to get info about users"""
from flask import make_response
from os import getenv
import requests
from spotify.token import create_auth_token, create_token, refresh_auth
import json
import urllib.parse


def get_user():
    """querys the spotify api to retrive user info"""
    token = create_token()
    url = 'https://api.spotify.com/v1/users/223tihi7zuc4xc2d4ppsg6d7i'

    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})

    if r.status_code != 200:
        # it broke
        return f"connection with spotify broke, code: {r.status_code}, response: {r.text}", 500

    return r.text


def get_me(auth_code, refresh_token):
    """gets info about current user, uses auth code and acesses private info,
    uses refresh token if available, otherwise creates a new token/refresh token"""
    if refresh_token and refresh_token != 'null':
        tokens = refresh_auth(refresh_token)
    else:
        tokens = create_auth_token(auth_code)
    access_token = tokens.get('access_token')
    refresh_token = tokens.get('refresh_token')

    print('token:', access_token)
    url = 'https://api.spotify.com/v1/me'
    r = requests.get(url, headers={'Authorization': f'Bearer {access_token}'})

    if r.status_code != 200:
        # it broke
        return f"connection with spotify broke, code: {r.status_code}, response: {r.text}", 500

    return_package = {'refresh_token': refresh_token, 'response': r.text}
    return json.dumps(return_package)


def get_me_init(auth_code):
    """initial spotify resource request"""
    # contact spotify server and receive back one time acces token
    # and refresh token
    tokens = create_auth_token(auth_code)

    access_token = tokens.get('access_token')
    refresh_token = tokens.get('refresh_token')

    url = 'https://api.spotify.com/v1/me'
    r = requests.get(url, headers={'Authorization': f'Bearer {access_token}'})

    if r.status_code != 200:
        # it broke
        return f"connection with spotify broke, code: {r.status_code}, response: {r.text}", 500

    # get data and encode it for http
    user_data = r.json()
    encoded_user_data = urllib.parse.quote(json.dumps(user_data))

    # frontend location
    redirect_url = getenv('REDIRECT_URL')

    # redirect back to homepage
    response = make_response("Redirecting", 302)
    response.headers['location'] = redirect_url

    # set refresh token and user data as cookies
    response.set_cookie('refresh_token', refresh_token)
    response.set_cookie('user_data', encoded_user_data)

    return response
