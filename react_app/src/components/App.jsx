import '../App.css';
import { useEffect, useState } from 'react';
import { LoggedIn, LoggedOut } from './loggedIn';
import apiHandler from '../services/myService';
import { isEmpty } from 'lodash';

export default function App() {
  const [userData, setUserData] = useState({});

  useEffect(function () {
    apiHandler
      .getMe()
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        apiHandler.setUserId(JSON.parse(data.response).id);
        setUserData(JSON.parse(data.response));
        apiHandler.saveRefreshToken(data.refresh_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!isEmpty(userData)) {
    return <LoggedIn userData={userData} />;
  } else {
    return <LoggedOut />;
  }
}
