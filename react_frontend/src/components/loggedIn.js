import { Searcher } from './searcher';
import apiHandler from '../services/myService';

export function LoggedIn({ userData }) {
  return (
    <>
      <h1>Hello {userData.display_name}</h1>
      <hr />
      <Searcher />
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
        test me
      </button>
    </>
  );
}

export function LoggedOut() {
  return (
    <>
      <h1>Spotify</h1>
      <h3>Hello, log yourself in here</h3>
      <div className='me'>
        <button
          className='logIn'
          onClick={() => {
            apiHandler
              .logMeIn()
              .then((res) => res.text())
              .then((data) => {
                console.log(data);
              });
          }}
        >
          Log Me In
        </button>
      </div>
    </>
  );
}
