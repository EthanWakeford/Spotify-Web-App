import { useState } from 'react';
import apiHandler from '../services/myService';
import PropTypes from 'prop-types';

export function CreatePlaylist({ recommendationResults }) {
  const [playlistName, setPlaylistName] = useState('My New Playlist');
  const [playlistId, setPlaylistId] = useState('');

  function handleClick() {
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
      .catch((err) => console.log(err));
  }

  if (recommendationResults) {
    return (
      <>
        <br />
        <br />
        <button onClick={handleClick}>Add songs to a playlist</button>
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

CreatePlaylist.propTypes = {
  recommendationResults: PropTypes.array,
};
