/* eslint-disable react/prop-types */
import Logo from "../assets/logo.jpg";
import { Button } from "@material-tailwind/react";
import CarouselDefault from "./CarouselDefault";

export default function LandingPage({setEnter, enter}) {
  function toggleSite() {
    setEnter(prev => !prev)
  }

  return (
    <div
      className="flex flex-col justify-center items-center text-blue-100 h-screen relative 
      bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-blue-500 to-blue-100"
    >
      <div className="flex flex-col items-center z-10">
        <div className="flex items-center text-3xl w-full px-2">
          <h1 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            birdingsnaps
          </h1>
          <img
            className="w-24 h-24 rounded-full ml-4 object-cover border-2 border-sky-100 shadow-md shadow-white"
            src={Logo}
            alt="birding snaps logo"
          />
        </div>
      </div>
      <Button className="my-16 px-8 bg-blue-300 text-gray-50 text-lg border-2 border-blue-100" onClick={toggleSite}>
          Enter Site
        </Button>
      <div className="w-[85%] border-gray-100 border-2 shadow-md shadow-gray-400">
        <CarouselDefault enter={enter}/>
      </div>
    </div>
  );
}
