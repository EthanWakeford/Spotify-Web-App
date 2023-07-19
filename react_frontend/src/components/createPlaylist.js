import apiHandler from '../services/myService';

export function CreatePlaylist({ recommendationResults }) {
  if (recommendationResults) {
    console.log(recommendationResults)
    return (
      <>
        <br />
        <br />
        <button
          onClick={() =>
            apiHandler
              .createPlaylist('new playlist')
              .then((res) => {
                console.log(res);
                return res.json();
              })
              .then((data) => console.log(data.id))
              .catch((err) => console.log(err))
          }
        >
          Add songs to a playlist
        </button>
      </>
    );
  } else {
    return null;
  }
}
