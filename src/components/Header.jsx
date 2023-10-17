/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Button } from "@material-tailwind/react";
import Logo from "../assets/logo.jpg";
import { BirdContext } from "../BirdContext";
import { auth } from "../../firebase.config";

export default function Header() {
  function signOut() {
    setShowFavorites(false)
    auth.signOut();
  }
  const value = useContext(BirdContext);
  const { setShowLoginModal, user, setShowFavorites } = value;

  return (
    <div className="flex h-24 justify-between items-center px-4 py-4 border-b bg-blue-500">
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl text-blue-100 text-outline mr-2">
          birdingsnaps
        </h1>
        <img
          className="w-16 h-16 rounded-full object-cover border-2 border-sky-100 shadow-md shadow-white"
          src={Logo}
          alt="birding snaps logo"
        />
      </div>
      <div>
        {user ? <Button
          className="bg-blue-300 text-gray-50 border-2 border-blue-100 p-2 cursor-pointer"
          onClick={signOut}
        >
          Sign Out
        </Button>
        :
        <Button
          className="bg-blue-300 text-gray-50 border-2 border-blue-100 py-2 px-4 cursor-pointer"
          onClick={() => setShowLoginModal(true)}
        >
          Login
        </Button>}
        <Button className="bg-blue-300 text-gray-50 border-2 border-blue-100 hidden">
          Favorites
        </Button>
      </div>
    </div>
  );
}
