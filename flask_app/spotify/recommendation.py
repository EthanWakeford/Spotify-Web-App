"""retrieves recommendations from the spotify api"""
import requests
from spotify.token import create_token


def get_recommendations(**kwargs):
    """gets the recommendations, *args are the url parameters"""
    url = 'https://api.spotify.com/v1/recommendations'
    token = create_token()
    payload = {
        'limit': '1',
        'market': 'US',
        'seed_artists': '6U1lmwvy3I9dIYu9RalJi6',
        'seed_tracks': '0wBVIJrD6tvVnBIQTEQpBt',
        'min_energy': '0.4',
    }
    headers = {
        'Authorization': f'Bearer {token}'
        # possibly necessary?
        # 'Accept': 'application/json',
        # 'Content-Type': 'application/json'
    }

    r = requests.get(url, params=payload, headers=headers)

    return r.text
