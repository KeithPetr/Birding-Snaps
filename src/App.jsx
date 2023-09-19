/* eslint-disable react/prop-types */
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import retrieveMetadata from "../metadata";

export default function App() {
  const [enter, setEnter] = useState(false);
  // Call the retrieveMetadata function in another module
  retrieveMetadata()
    .then((metadata) => {
      console.log("current metadata: ", metadata);
    })
    .catch((error) => {
      console.error("Error retrieving metadata: ", error);
    });

  return (
    <>
      {!enter ? (
        <LandingPage setEnter={setEnter} />
      ) : (
        <Home setEnter={setEnter} enter={enter} />
      )}
    </>
  );
}
