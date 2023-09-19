import '../css/App.css';
import apiHandler from '../services/myService';
import { Searcher } from './searcher';
import { isEmpty } from 'lodash';

export default function App() {
  const userData = apiHandler.userData;

  if (userData && !isEmpty(userData)) {
    return (
      <>
        <h1>Spotify Music Searcher</h1>
        <h2>Hello {userData.display_name}</h2>
        <hr />
        <Searcher />
        <br />
      </>
    );
  } else {
    return (
      <>
        <h1>Spotify Music Searcher</h1>
        <h3>Hello, log yourself in here</h3>
        <div className='me'>
          <a href={apiHandler.logMeIn()}>
            <button>Log Me In</button>
          </a>
        </div>
        <Searcher></Searcher>
      </>
    );
  }
}
