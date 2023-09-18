/* eslint-disable react/prop-types */
import {useState} from "react";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";


export default function App() {
  const [enter, setEnter] = useState(false)

  return (
    <>
      {!enter ? <LandingPage setEnter={setEnter} /> : <Home setEnter={setEnter} enter={enter}/>}
    </>
  );
}
