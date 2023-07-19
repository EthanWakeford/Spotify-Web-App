"""creates and adds to a user playlist"""
import requests
from spotify.token import refresh_auth


def create_playlist(refresh_token, playlist_name, user_id):
    """creates a user playlist with spotify api"""
    token = refresh_auth(refresh_token).get('access_token')

    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    data = {
        'name': playlist_name
    }

    url = f'https://api.spotify.com/v1/users/{user_id}/playlists'

    r = requests.post(url, headers=headers, json=data)

    return r.text
