import requests
from spotify.token import create_token

def get_artist():
    """querys the spotify api to retrive artist info"""

    token = create_token()
    url = 'https://api.spotify.com/v1/artists/6U1lmwvy3I9dIYu9RalJi6'

    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})
    return {'status': r.status_code, 'text': r.text}
