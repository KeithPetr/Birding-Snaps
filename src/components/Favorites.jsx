import { BirdContext } from "../BirdContext";
import { useContext, useState, useEffect } from "react";
import ZoomedImages from "./ZoomedImages";

export default function Favorites() {
  const value = useContext(BirdContext);
  const {
    imageFavorites,
    setShowBirdGallery,
    showBirdGallery,
    setClickedImageUrl,
  } = value;
  const itemsPerPage = 12; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const photoElements = imageFavorites
    ?.slice(startIdx, endIdx)
    .map((image, index) => {
      return (
        <div
          key={index}
          className="w-24 h-24 border hover:border-blue-500 hover:border-4 cursor-pointer"
        >
          <img
            className="h-full w-full"
            src={image}
            onClick={() => zoomedFavorites(image)}
          />
        </div>
      );
    });

  const totalPageCount = imageFavorites
    ? Math.ceil(imageFavorites.length / itemsPerPage)
    : 0;

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  useEffect(() => {
    // Ensure currentPage doesn't exceed the total number of pages
    if (currentPage > totalPageCount && totalPageCount > 0) {
      setCurrentPage(totalPageCount); // Reset to the first page
    }
  }, [currentPage, totalPageCount]);

  function zoomedFavorites(image) {
    setShowBirdGallery(true);
    setClickedImageUrl(image);
  }

  return (
    <>
      {showBirdGallery && <ZoomedImages />}
      <h1 className="text-blue-400 font-bold text-2xl text-center mt-2">
        Favorites
      </h1>
      <div className="flex flex-col items-center mt-4">
        <div className="flex flex-wrap justify-center gap-2">
          {photoElements}
        </div>
        <div className="mt-4">
        {Array.from({length: totalPageCount}).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mr-1 text-white px-1 ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        </div>
      </div>
    </>
  );
}
