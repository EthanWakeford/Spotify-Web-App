"""functions that use the spotify API search tool"""
import requests
from spotify.token import create_token


def search(*args, **kwargs):
    """uses the spotify API search tool"""
    if 'query' not in kwargs:
        return 'must have query', 400
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

    if r.status_code != 200:
        # it broke
        return f"connection with spotify broke, code: {r.status_code}, response: {r.text}", 500

    return r.text
