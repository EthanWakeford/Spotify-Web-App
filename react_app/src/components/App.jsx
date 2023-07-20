import '../App.css';
import { useEffect, useState } from 'react';
import { LoggedIn, LoggedOut } from './loggedIn';
import apiHandler from '../services/myService';

export default function App() {
  const [userData, setUserData] = useState({});

  useEffect(function () {
    apiHandler
      .getMe()
      .then((res) => res.json())
      .then((data) => {
        apiHandler.setUserId(JSON.parse(data.response).id)
        setUserData(JSON.parse(data.response));
        apiHandler.saveRefreshToken(data.refresh_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (userData) {
    return <LoggedIn userData={userData} />;
  } else {
    return <LoggedOut />;
  }
}