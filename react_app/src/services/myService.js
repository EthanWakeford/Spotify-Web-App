// contains a service that handles communication between react and the
// serverside API
const env = import.meta.env;
console.log(env);
const serverUrl = import.meta.env.VITE_SERVER_URL;
console.log(serverUrl);

class MyService {
  // holds functions to handle querying serverside API, interface to the backend
  constructor() {
    this.userData = '';
    const params = new URLSearchParams(window.location.search);
    const paramToken = params.get('refresh_token');
    const storageToken = window.localStorage.getItem('refreshToken');

    if (!paramToken) {
      this.RefreshToken = storageToken;
    } else {
      // update storage
      if (!storageToken || storageToken !== paramToken) {
        window.localStorage.setItem('refreshToken', paramToken);
      }
      this.RefreshToken = paramToken;
    }
  }

  getMe() {
    // queries the serverside api, prevents the authcode from being used
    // more than once

    if (!this.RefreshToken) {
      return Promise.reject('no login creds');
    }

    return fetch(
      `${serverUrl}/me?` +
        new URLSearchParams({
          refreshToken: this.RefreshToken,
        })
    );
  }

  logMeIn() {
    // Triggers the OAuth control flow
    return (
      `${serverUrl}/log_in?` +
      new URLSearchParams({
        scopes:
          'user-read-private user-read-email playlist-modify-public playlist-modify-private',
      })
    );
  }

  getAuthCode() {
    // gets authcode from url, returns empty string if not found
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const authCode = urlParams.get('code');
    return authCode;
  }

  searchSpotify(query, limit, offset, seedType) {
    // searches spotify for artists or tracks based on the query
    return fetch(
      `${serverUrl}/searcher?` +
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
      `${serverUrl}/recommendations?` +
        new URLSearchParams(Object.assign(seeds, songAttributes))
    );
  }

  createPlaylist(name, recommendationResults) {
    // creates a user playlist named name
    return fetch(`${serverUrl}/create_playlist`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        user_id: this.userData.id,
        token: this.RefreshToken,
        song_uris: recommendationResults.map(
          (song) => `spotify:track:${song.id}`
        ),
      }),
    });
  }
}

const apiHandler = new MyService();
export default apiHandler;
