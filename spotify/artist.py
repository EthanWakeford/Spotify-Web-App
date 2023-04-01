"""querys the spotify api to retrive artist info"""
import requests
import os

def get_artist():
    token = os.getenv('TOKEN')
    url = 'https://api.spotify.com/v1/artists/6U1lmwvy3I9dIYu9RalJi6?si=0J6-QF37STKTawAi-i9M5Q'

    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})
    return r.text
