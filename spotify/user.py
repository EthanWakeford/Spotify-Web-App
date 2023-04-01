"""querys the spotify api to retrive user info"""
import requests
import os

def get_user():
    if (requests and os):
        return 'user'
    else:
        return 'user not found'
