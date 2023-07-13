"""functions that use the spotify API search tool"""
import requests
from spotify.token import create_token


def search(*args, **kwargs):
    """uses the spotify API search tool"""
    if 'query' not in kwargs:
        raise Exception('No query')
    defaults = {'type': ['track', 'artist'], 'limit': 10, 'offset': 0}

    payload = {'query': kwargs['query']}
    for key, default_value in defaults.items():
        payload[key] = kwargs[key] if key in kwargs else default_value

    url = 'https://api.spotify.com/v1/search'
    token = create_token()

    headers = {
        'Authorization': f'Bearer {token}'
    }
    print(payload)
    r = requests.get(url, params=payload, headers=headers)
    return r.text
