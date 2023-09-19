// contains a service that handles communication between react and the
// serverside API
import Cookies from 'js-cookie';
const env = import.meta.env;
console.log(env);
const serverUrl = import.meta.env.VITE_SERVER_URL;
console.log(serverUrl);

class MyService {
  // holds functions to handle querying serverside API, interface to the backend
  constructor() {
    const userData = Cookies.get('user_data');
    if (userData) {
      const decodedData = decodeURIComponent(userData);
      // console.log(decodedData);
      this.userData = JSON.parse(decodeURIComponent(decodedData));
      this.userId = userData.id;
      console.log(this.userData);
    } else {
      this.userData = '';
      this.userId = '';
    }
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
      `${serverUrl}/api/me?` +
        new URLSearchParams({
          authCode: this.#AuthCode,
          refreshToken: this.#RefreshToken,
        })
    );
  }

  logMeIn() {
    // Triggers the OAuth control flow
    return (
      `${serverUrl}/api/log_in?` +
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
    // get refresh token from cookies
    return Cookies.get('refresh_token');
  }

  searchSpotify(query, limit, offset, seedType) {
    // searches spotify for artists or tracks based on the query
    console.log(query);
    return fetch(
      `${serverUrl}/api/searcher?` +
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
      `${serverUrl}/api/recommendations?` +
        new URLSearchParams(Object.assign(seeds, songAttributes))
    );
  }

  createPlaylist(name, recommendationResults) {
    // creates a user playlist named name
    console.log(this.userId);
    return fetch(`${serverUrl}/api/create_playlist`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        user_id: this.userId,
        token: this.#RefreshToken,
        song_uris: recommendationResults.map(
          (song) => `spotify:track:${song.id}`
        ),
      }),
    });
  }
}

const apiHandler = new MyService();
export default apiHandler;
