/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { BirdContext } from "../BirdContext";

export default function GalleryDetails() {
  const value = useContext(BirdContext);
  const {
    displayBirdDetails,
    imageUrls,
    selectedBirdName,
    birdIntro,
    isLoading,
  } = value;

  const characterLimit = 100;
  const [showFullIntro, setShowFullIntro] = useState(false);

  const toggleIntro = () => {
    setShowFullIntro(!showFullIntro);
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    const lastSpaceIndex = text.lastIndexOf(" ", limit);
    return text.slice(0, lastSpaceIndex) + " ...";
  };

  return isLoading ? (
    ""
  ) : (
    <div className="p-4 flex flex-col items-center max-w-[600px]">
      <h1 className="text-outline text-blue-100 font-bold text-2xl sm:text-3xl text-center">
        {selectedBirdName}
      </h1>
      <div className="w-9/12 md:w-11/12 h-30 max-w-md mt-2 border-gray-100 border-2 shadow-md shadow-gray-400 overflow-y-auto">
        <img
          className="w-full h-full"
          src={imageUrls[0]?.url}
          alt={selectedBirdName}
        />
      </div>
      <p className="text-outline mt-4 text-gray-100 text-sm sm:text-lg text-center">
        {displayBirdDetails && (
          <>
            {showFullIntro
              ? birdIntro
              : truncateText(birdIntro, characterLimit)}
            {birdIntro.length > characterLimit && (
              <button
                className="text-outline text-blue-400 underline cursor-pointer ml-1"
                onClick={toggleIntro}
              >
                {showFullIntro ? "Read Less" : "Read More"}
              </button>
            )}
          </>
        )}
      </p>
    </div>
  );
}
