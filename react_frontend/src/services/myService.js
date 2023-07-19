// contains a service that handles communication between react and the
// serverside API

class MyService {
  // holds functions to handle querying serverside API, interface to the backend
  constructor() {
    this.userId = '';
  }

  #AuthCodeUsed = false;
  #AuthCode = this.getAuthCode();
  #RefreshToken = this.getRefreshToken();

  setUserId(userId) {
    this.userId = userId;
  }

  getMe() {
    // queries the serverside api, prevents the authcode from being used
    // more than once

    if (!this.#AuthCode && !this.#RefreshToken) {
      return Promise.reject('no login creds');
    }

    if (this.#AuthCode && !this.#RefreshToken) {
      if (this.#AuthCodeUsed) {
        this.#AuthCode = '';
        return Promise.reject('authcode can only be used once');
      }

      this.#AuthCodeUsed = true;
    }

    return fetch(
      '/api/me?' +
        new URLSearchParams({
          authCode: this.#AuthCode,
          refreshToken: this.#RefreshToken,
        })
    );
  }

  logMeIn() {
    // Triggers the OAuth control flow
    return fetch(
      '/api/log_in?' +
        new URLSearchParams({
          scopes:
            'user-read-private user-read-email playlist-modify-public playlist-modify-private',
        })
    );
  }

  saveRefreshToken(refreshToken) {
    // saves a refresh token to local memory
    const oldToken = this.getRefreshToken();

    if (!oldToken || oldToken !== refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
      this.#RefreshToken = refreshToken;
    }
  }

  getAuthCode() {
    // gets authcode from url, returns empty string if not found
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const authCode = urlParams.get('code');
    return authCode;
  }

  getRefreshToken() {
    // gets refresh token from local storage, returns empty string if not found
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken && refreshToken !== 'null') {
      return refreshToken;
    }
    return '';
  }

  searchSpotify(query, limit, offset, seedType) {
    // searches spotify for artists or tracks based on the query
    console.log(query);
    return fetch(
      '/api/searcher?' +
        new URLSearchParams({
          query: query,
          limit: limit,
          offset: offset,
          type: seedType,
        })
    );
  }

  getRecommendations(seedSelection, songAttributes) {
    // gets recommendations from spotify based on the seeds and song
    // attributes selected
    const seeds = {
      seed_artists: seedSelection
        .filter((seed) => seed.type === 'artist')
        .map((seed) => seed.id)
        .join(','),
      seed_tracks: seedSelection
        .filter((seed) => seed.type === 'track')
        .map((seed) => seed.id)
        .join(','),
    };
    return fetch(
      '/api/recommendations?' +
        new URLSearchParams(
          Object.assign(seeds, songAttributes, { min_acousticness: 0.7 })
        )
    );
  }

  createPlaylist(name) {
    // creates a user playlist named name
    console.log(this.userId);
    return fetch('/api/create_playlist', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        user_id: this.userId,
        token: this.#RefreshToken,
      }),
    });
  }
}

const apiHandler = new MyService();
export default apiHandler;
