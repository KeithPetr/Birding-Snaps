/* eslint-disable react/prop-types */
import CarouselDefault from "./CarouselDefault";
import { useContext, useState } from "react";
import { BirdContext } from "../BirdContext";

export default function GalleryDetails({ enter }) {
  const value = useContext(BirdContext);
  const { displayBirdDetails, imageUrls, selectedBirdName, birdIntro, isLoading } = value;

  const characterLimit = 100;
  const [showFullIntro, setShowFullIntro] = useState(false);

  const toggleIntro = () => {
    setShowFullIntro(!showFullIntro);
  };

  const truncateText = (text, limit) => {
    console.log(limit)
    if (text.length <= limit) {
      return text;
    }
    const lastSpaceIndex = text.lastIndexOf(" ", limit);
    console.log(lastSpaceIndex)
    return text.slice(0, lastSpaceIndex) + " ...";
  };

  return (
    isLoading ? '' :
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-blue-400 font-bold text-2xl text-center">
        {selectedBirdName ? selectedBirdName : "Today's Favorites"}
      </h1>
      <div className="aspect-w-16 aspect-h-9 max-w-md mt-2 border-gray-100 border-2 shadow-md shadow-gray-400">
        {displayBirdDetails ? (
          <img src={imageUrls[0]?.url} alt={selectedBirdName} />
        ) : (
          <CarouselDefault enter={enter} />
        )}
      </div>
      <p className="mt-4 text-blue-100 text-sm text-center">
        {displayBirdDetails ? (
          <>
            {showFullIntro ? birdIntro : truncateText(birdIntro, characterLimit)}
            {birdIntro.length > characterLimit && (
              <button
                className="text-blue-400 underline cursor-pointer ml-1"
                onClick={toggleIntro}
              >
                {showFullIntro ? "Read Less" : "Read More"}
              </button>
            )}
          </>
        ) : (
          "Click on the sidebar menu to begin your search through my gallery!"
        )}
      </p>
    </div>
  );
}
