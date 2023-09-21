"""creates and adds to a user playlist"""
import requests
from spotify.token import refresh_auth
import json


def create_playlist(refresh_token, playlist_name, user_id, song_uris):
    """creates a user playlist with spotify api and then populates that
    playlist with songs"""
    print(song_uris)
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

    print(r.status_code)
    if r.status_code != 201:
        return 'Failed to create playlist', 500

    playlist_id = json.loads(r.text).get('id')

    return populate_playlist(token, playlist_id, song_uris)


def populate_playlist(token, playlist_id, song_uris):
    """takes a list of songs and populates designated playlist with them"""
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    data = {
        "uris": song_uris
    }

    url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'

    r = requests.post(url, headers=headers, json=data)

    if r.status_code != 201:
        return 'Failed to populate playlist', 500
    return json.dumps(playlist_id)
