"""different functions to get info about users"""
from flask import make_response
from os import getenv
import requests
from spotify.token import create_auth_token, create_token, refresh_auth
import json


def get_user():
    """querys the spotify api to retrive user info without oauth"""
    token = create_token()
    user_id = ''
    url = f'https://api.spotify.com/v1/users/{user_id}'

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


def new_get_me(refresh_token):
    """gets info about user using refresh token"""
    access_token = refresh_auth(refresh_token).get('access_token')

    url = 'https://api.spotify.com/v1/me'
    r = requests.get(url, headers={'Authorization': f'Bearer {access_token}'})

    if r.status_code != 200:
        # it broke
        return f"connection with spotify broke, code: {r.status_code}, response: {r.text}", 500

    return r.text


def handle_redirect(auth_code):
    """handles redirecting the browser back to the front-end, along with
    the refresh token"""
    # creating refresh token
    try:
        refresh_token = create_auth_token(auth_code).get('refresh_token')
    except Exception as e:
        return e, 500

    # frontend location
    redirect_url = getenv('REDIRECT_URL')

    response = make_response("Redirecting", 302)
    response.headers['location'] = f'{redirect_url}?refresh_token={refresh_token}'

    return response
