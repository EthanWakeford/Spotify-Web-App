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
        <p>
          { val ? val: '...Loading' }
        </p>
  );
}

export default App;
