import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [val, setVal] = useState('');

  useEffect(() => {
    fetch("/info")
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((data) => {
        setVal(data.data);
        console.log(data)
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          { val ? val: '...Loading' }
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
