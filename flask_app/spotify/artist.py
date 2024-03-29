"""honestly just here incase i ever need this code"""
import requests
from spotify.token import create_token


def get_artist():
    """querys the spotify api to retrive artist info"""

    token = create_token()
    artist_id = ''
    url = f'https://api.spotify.com/v1/artists/{artist_id}'

    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})

    if r.status_code != 200:
        # it broke
        return f"connection with spotify broke, code: {r.status_code}, response: {r.text}", 500

    return {'status': r.status_code, 'text': r.text}
