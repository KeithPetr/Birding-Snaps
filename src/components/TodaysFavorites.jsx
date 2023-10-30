import CarouselDefault from "./CarouselDefault";
import { BirdContext } from "../BirdContext";
import { useContext } from "react";

export default function TodaysFavorites() {
  const value = useContext(BirdContext);
  const { user } = value;
  const nameArray = user?.displayName.split(" ");
  return (
    <div
      className="p-2 flex flex-col justify-center h-full w-11/12 max-w-[650px]
    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      {user ? (
        <h1 className="text-white text-outline text-3xl md:text-4xl text-center mb-4">
          Welcome, {nameArray[0]}!
        </h1>
      ) : null}
      <p className="text-teal-100 text-outline text-xl md:text-2xl text-center mb-8">Recently Added: Turkey Vulture</p>
      <div>
        <h1 className="text-outline text-blue-100 font-bold text-2xl sm:text-3xl text-center">
          Today&apos;s Favorites
        </h1>
        <div className="w-full h-30 mt-2 border-gray-100 border-2 shadow-md shadow-gray-400">
          <CarouselDefault />
        </div>
      </div>

      <p className="text-outline mt-4 text-gray-100 text-md sm:text-lg md:text-xl text-center">
        Click on the sidebar menu to begin your search through my gallery!
      </p>
    </div>
  );
}
