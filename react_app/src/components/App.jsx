import '../css/App.css';
import apiHandler from '../services/myService';
import { Searcher } from './searcher';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

export default function App() {
  const [userData, setUserData] = useState('');

  const getUserData = async () => {
    const response = await apiHandler.getMe();
    const resData = await response.json();
    setUserData(resData);
  };

  useEffect(() => {
    getUserData();
  }, []);

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
