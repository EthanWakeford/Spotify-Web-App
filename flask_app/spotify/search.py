"""functions that use the spotify API search tool"""
import requests
from spotify.token import create_token


def search(query, type=['album', 'artist', 'track'], limit=10, offset=0):
    """uses the spotify API search tool"""
    url = 'https://api.spotify.com/v1/search'
    token = create_token()
    payload = {
        'q': query,
        'type': type,
        'market': 'US',
        'limit': limit,
        'offset': offset
    }

    headers = {
        'Authorization': f'Bearer {token}'
    }

    r = requests.get(url, params=payload, headers=headers)

    return r.text
