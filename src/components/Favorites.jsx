import { BirdContext } from "../BirdContext";
import { useContext, useState, useEffect } from "react";

export default function Favorites() {
  const value = useContext(BirdContext);
  const {
    imageFavorites,
    setShowBirdGallery,
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
          className="w-20 h-16 h- sm:w-32 sm:h-28 md:w-48 md:h-40
          border hover:border-blue-500 hover:border-4 cursor-pointer"
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
      <h1 className="text-outline text-blue-100 font-bold text-2xl md:text-4xl text-center mt-4">
        Favorites
      </h1>
      <div className="flex flex-col items-center mt-4">
        <div className="flex flex-wrap justify-center gap-2 max-w-[900px] p-4">
          {photoElements}
        </div>
        <div className="mt-4">
        {Array.from({length: totalPageCount}).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mr-1 text-white px-1 md:text-xl ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        </div>
        <p className="text-white text-center mt-4 mx-4 md:text-lg max-w-[600px]">
          {`Saving edited images is limited to desktop version for now. 
          After editing an image, right click and select "Save image as..."`}</p>
      </div>
    </>
  );
}
