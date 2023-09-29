/* eslint-disable react/prop-types */
import CarouselDefault from "./CarouselDefault";
import { useContext } from "react";
import { BirdContext } from "../BirdContext";

export default function GalleryDetails({ enter }) {
  const value = useContext(BirdContext);
  const { displayBirdDetails, imageUrls, selectedBirdName } = value;
  

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-blue-400 font-bold text-2xl">
      {selectedBirdName ? selectedBirdName : "Today's Favorites"}
      </h1>
      <div className="aspect-w-16 aspect-h-9 max-w-md mt-2 border-gray-100 border-2 shadow-md shadow-gray-400">
        {displayBirdDetails ? (
          <img src={imageUrls[0]} />
        ) : (
          <CarouselDefault enter={enter} />
        )}
      </div>
      <p className="mt-4 text-blue-100 text-center">
        {displayBirdDetails
          ? "Description of the currently selected bird will appear here"
          : "Click on the sidebar menu to begin your search through my gallery!"}
      </p>
    </div>
  );
}
