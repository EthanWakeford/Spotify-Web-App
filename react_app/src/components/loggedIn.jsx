import { Searcher } from './searcher';
import apiHandler from '../services/myService';
import PropTypes from 'prop-types';

export function LoggedIn({ userData }) {
  return (
    <>
      <h2>Hello {userData.display_name}</h2>
      <hr />
      <Searcher />
      <br />
    </>
  );
}

LoggedIn.propTypes = {
  userData: PropTypes.object,
};

export function LoggedOut() {
  return (
    <>
      <h1>Spotify</h1>
      <h3>Hello, log yourself in here</h3>
      <div className='me'>
        <a href={apiHandler.logMeIn()}>
          <button
            // className='logIn'
            // onClick={() => {
            //   apiHandler
            //     .logMeIn()
            //     .then((res) => {
            //       console.log(res.status)
            //       console.log(res.redirected)
            //       return res.text();
            //     })
            //     .then((data) => {
            //       console.log(data);
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     });
            // }}
          >
            Log Me In
          </button>
        </a>
      </div>
    </>
  );
}
