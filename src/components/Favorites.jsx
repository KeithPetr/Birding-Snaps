import { BirdContext } from "../BirdContext";
import { useContext } from "react";

export default function Favorites() {
  const value = useContext(BirdContext);
  const { imageFavorites } = value;

  const photoElements = imageFavorites.map((image, index) => {
    return (
      <div
        key={index}
        className="w-24 h-24 border hover:border-blue-500 hover:border-2 cursor-pointer transition-transform hover:scale-105"
      >
        <img className="h-full w-full" src={image} />
      </div>
    );
  });

  return (
    <>
      <h1 className="text-blue-400 font-bold text-2xl text-center">Favorites</h1>
      <div className="flex flex-wrap gap-x-2 gap-y-2 pb-4 px-2 justify-center mt-4">
        {photoElements}
      </div>
    </>
  );
}
