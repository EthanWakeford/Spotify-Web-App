import '../App.css';
import { LoggedIn, LoggedOut } from './loggedIn';
import apiHandler from '../services/myService';
import { isEmpty } from 'lodash';

export default function App() {
  const userData = apiHandler.userData;

  if (userData && !isEmpty(userData)) {
    return <LoggedIn userData={userData} />;
  } else {
    return <LoggedOut />;
  }
}
