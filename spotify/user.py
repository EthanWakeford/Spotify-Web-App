"""different functions to get info about users"""

import requests
from spotify.token import create_auth_token, create_token

def get_user():
    """querys the spotify api to retrive user info"""

    token = create_token()
    url = 'https://api.spotify.com/v1/users/223tihi7zuc4xc2d4ppsg6d7i'

    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})
    return r.text

def get_me():
    """gets info about current user, uses auth code and acesses private info"""
    
    token = create_auth_token('user-read-private', 'user-read-email')
    # token = 'BQCoLzq3PJpegxRvR2C58ootM3oQWrB5nFiSfZG9oQgk9jQezjIjsPmf8NYjqmp3mBE4JhXzItjltPruNGp4Vm4h7QOF-DInu7HPmXlVX1hy_vJQYQsNp-6ggflSBnMm2cv-fTJR2bzpPcSnMImzfHeyo7_J21njaetnFTVfjvWc1vGAOuPklCYjZby4ocexI2JtBKaxr2SazyH0CI2UqPI'
    url = 'https://api.spotify.com/v1/me'

    r = requests.get(url, headers={'Authorization': f'Bearer {token}'})
    return r.text
