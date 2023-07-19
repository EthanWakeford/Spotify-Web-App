import { useState } from 'react';
import apiHandler from '../services/myService';

export function CreatePlaylist({ recommendationResults }) {
  const [playlistName, setPlaylistName] = useState('My New Playlist');
  const [playlistId, setPlaylistId] = useState('');

  if (recommendationResults) {
    console.log(recommendationResults);
    return (
      <>
        <br />
        <br />

        <button
          onClick={() =>
            apiHandler
              .createPlaylist(playlistName, recommendationResults)
              .then((res) => {
                console.log(res);
                return res.json();
              })
              .then((data) => {
                console.log(data);
                setPlaylistId(data);
              })
              .catch((err) => console.log(err))
          }
        >
          Add songs to a playlist
        </button>
        <label>
          Playlist Name:
          <textarea
            defaultValue={'My New Playlist'}
            rows={1}
            cols={40}
            name='queryBox'
            onChange={(e) => {
              setPlaylistName(e.target.value);
            }}
          ></textarea>
        </label>
        {playlistId ? <p>Success! Your Playlist ID: {playlistId}</p> : null}
      </>
    );
  } else {
    return null;
  }
}
