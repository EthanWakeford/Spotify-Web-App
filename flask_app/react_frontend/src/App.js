import './App.css';
import { useEffect, useState } from 'react';
import { LoggedIn, LoggedOut } from './components/loggedIn';
import apiHandler from './services/myService';

export default function App() {
  const [userData, setUserData] = useState();

  useEffect(
    function () {
      if (userData) {
        console.log('no api call');
        return;
      }
      apiHandler
        .getMe()
        .then((res) => res.json())
        .then((data) => {
          setUserData(JSON.parse(data.response));
        })
        .catch((err) => {
          console.log(err);
        });
      // .then((data) => {
      //   console.log(data);
      //   if (!token || token === 'null') {
      //     /* if refresh token does NOT exist already in local storage, add
      //   returned refresh token to local storage */
      //
      //   }
      //   setUserData(JSON.parse(data.response));
      // })
    },
    [userData]
  );

  if (userData) {
    return <LoggedIn userData={userData} />;
  } else {
    return <LoggedOut />;
  }
}

function getAuthCode() {
  // gets authcode from url, returns empty string if not found
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const authCode = urlParams.get('code');
  return authCode;
}

function getToken() {
  // gets refresh token from local storage, returns empty string if not found
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken && refreshToken !== 'null') {
    return refreshToken;
  }
  return '';
}

function refreshTokenSetter(refreshToken) {
  // sets the refresh token into local storage if not already present
  // (or new one exists)

  localStorage.setItem('refreshToken', refreshToken);
  // setToken(refreshToken);
}
