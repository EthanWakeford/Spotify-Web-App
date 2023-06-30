import './App.css';
import { useEffect, useState } from 'react';
import { LoggedIn, LoggedOut } from './components/loggedIn';
import useToken from './usetoken';

export default function App() {
  const [userData, setUserData] = useState();
  const [token, setToken] = useState(getToken());
  const authCode = getAuthCode();

  function getMe(token, authCode) {
    return fetch(
      '/api/me?' +
        new URLSearchParams({
          authCode: authCode,
          refreshToken: token,
        })
    );
  }

  useEffect(
    function () {
      if (!token && !authCode) {
        return;
      }
      console.log('effecting');
      try {
        getMe(token, authCode)
          .then((res) => res.json())
          // .then(() => {
          //   setUserData({ display_name: 'Ethan' });
          // });
          .then((data) => {
            console.log(data);
            if (!token || token === 'null') {
              /* if refresh token does NOT exist already in local storage, add
          returned refresh token to local storage */
              const refreshToken = data.refresh_token;
              localStorage.setItem('refreshToken', refreshToken);
              setToken(refreshToken);
            }
            setUserData(JSON.parse(data.response));
          });
      } catch (error) {
        alert('login to spotify has failed');
        console.error('login error: ', error);
      }
    },
    [authCode, token]
  );

  if (userData) {
    return <LoggedIn userData={userData} />;
  } else {
    return <LoggedOut />;
  }
}

function getAuthCode() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const authCode = urlParams.get('code');
  return authCode;
}

function getToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken && refreshToken !== 'null') {
    return refreshToken;
  }
  return '';
}
