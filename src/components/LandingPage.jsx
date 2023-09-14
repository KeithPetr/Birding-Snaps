/* eslint-disable react/prop-types */
import Logo from "../assets/logo.jpg";
// import Carousel from "./Carousel.jsx";
import { Button } from "@material-tailwind/react";
import CarouselDefault from "./CarouselDefault";

export default function LandingPage() {

  return (
    <div
      className="flex flex-col justify-center items-center bg-blue-900 text-blue-300 h-screen relative"
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="flex flex-col items-center z-10">
        <div className="flex items-center text-6xl ">
          <h1 className="">birdingsnaps</h1>
          <img
            className="w-32 h-32 rounded-full mx-4 object-cover"
            src={Logo}
            alt="birding snaps logo"
          />
        </div>
        <Button className="mt-8 px-8 py-4 bg-blue-300 text-gray-50 text-lg">
          Enter Site
        </Button>
      </div>
      <CarouselDefault />
    </div>
  );
}
