/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import Logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-4 py-4 border-b mb-2">
      <div className="flex items-center">
        <h1 className="text-xl text-blue-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mr-2">
          birdingsnaps
        </h1>
        <img
          className="w-16 h-16 rounded-full object-cover border-2 border-sky-100 shadow-md shadow-white"
          src={Logo}
          alt="birding snaps logo"
        />
      </div>
      <div>
        <Button className="bg-blue-300 text-gray-50 border-2 border-blue-100 mr-2">Login</Button>
        <Button className="bg-blue-300 text-gray-50 border-2 border-blue-100">Favorites</Button>
      </div>
    </div>
  );
}