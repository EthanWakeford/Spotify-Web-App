def get_user():
    """querys the spotify api to retrive user info"""
    import requests
    from spotify.token import create_auth_token, create_token

    token = create_token()
    url = 'https://api.spotify.com/v1/users/223tihi7zuc4xc2d4ppsg6d7i'

    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})
    return r.text
