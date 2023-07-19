// contains a service that handles communication between react and the
// serverside API

class MyService {
  #AuthCodeUsed = false;
  #AuthCode = this.getAuthCode();
  #RefreshToken = this.getRefreshToken();

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

  saveRefreshToken(refreshToken) {
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
        new URLSearchParams(Object.assign(seeds, songAttributes, {min_acousticness: 0.7}))
    );
  }
}

const apiHandler = new MyService();
export default apiHandler;
