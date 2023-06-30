import './App.css';
import { useEffect, useState } from 'react';
import { LoggedIn, LoggedOut } from './components/loggedIn';
import useToken from './usetoken';

export default function App() {
  const [userData, setUserData] = useState();
  const [token, setToken] = useState(getToken());
  const [authCode, setAuthCode] = useState(getAuthCode());

  function getMe(token, authCode) {
    console.log('fetching');
    return fetch(
      '/api/me?' +
        new URLSearchParams({
          authCode: token ? '' : authCode,
          refreshToken: token,
        })
    );
  }

  useEffect(
    function () {
      console.log('effecting', authCode);
      if (userData || (!token && !authCode)) {
        console.log('no api call');
        return;
      }
      const code = authCode;
      setAuthCode('');
      console.log('getting me');
      getMe(token, authCode)
        .then((res) => {
          console.log(res.status);
          return res.json();
        })
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
        })
        .catch((error) => {
          alert('login to spotify has failed');
          console.error('login error: ', error);
        });
    },
    [authCode, token, userData]
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
