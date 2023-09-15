/* eslint-disable react/prop-types */
import Logo from "../assets/logo.jpg";
// import Carousel from "./Carousel.jsx";
import { Button } from "@material-tailwind/react";
import CarouselDefault from "./CarouselDefault";

export default function LandingPage() {

  return (
    <div
      className="flex flex-col justify-center items-center text-blue-100 h-screen relative 
      bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-blue-500 to-blue-100"
    >
      <div className="flex flex-col items-center z-10">
        <div className="flex items-center text-4xl ">
          <h1 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">birdingsnaps</h1>
          <img
            className="w-32 h-32 rounded-full mx-4 object-cover border-2 border-sky-100 shadow-md shadow-white"
            src={Logo}
            alt="birding snaps logo"
          />
        </div>
        <Button className="mt-8 px-8 py-4 bg-blue-300 text-gray-50 text-lg border-2 border-blue-100">
          Enter Site
        </Button>
      </div>
      <CarouselDefault />
    </div>
  );
}
