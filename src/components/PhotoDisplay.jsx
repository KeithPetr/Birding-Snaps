/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { BirdContext } from "../BirdContext";
import { getDownloadURL } from "firebase/storage";
import ReactLoading from "react-loading";

export default function PhotoDisplay() {
  const value = useContext(BirdContext);
  const {
    matchingImages,
    imageUrls,
    setImageUrls,
    setShowBirdGallery,
    setClickedImageUrl,
    isLoading,
  } = value;
  const itemsPerPage = 8; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        if (matchingImages && matchingImages.items) {
          // Map over the items in matchingImages to get the download URLs
          const startIdx = (currentPage - 1) * itemsPerPage;
          const endIdx = startIdx + itemsPerPage;

          const urls = await Promise.all(
            matchingImages.items.slice(startIdx, endIdx).map(async (item) => {
              const url = await getDownloadURL(item);
              return { url, fullPath: item.fullPath };
            })
          );
          setImageUrls(urls);
        }
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    // Call the function to fetch image URLs
    if (matchingImages && matchingImages.items) {
      fetchImageUrls();
    }
  }, [matchingImages, setImageUrls, currentPage]);

  // Calculate totalPageCount only if matchingImages and matchingImages.items are defined
  const totalPageCount =
    matchingImages && matchingImages.items
      ? Math.ceil(matchingImages.items.length / itemsPerPage)
      : 0;

  const photoElements = imageUrls.map((urlInfo, index) => {
    const { url, fullPath } = urlInfo;
    return (
      <div
        key={index}
        className="w-20 h-16 sm:w-28 sm:h-24 cursor-pointer border hover:border-blue-500 hover:border-4"
      >
        <img
          className="h-full w-full"
          src={url}
          id={fullPath}
          onClick={() => handleImageClick(url)}
        />
      </div>
    );
  });

  function handleImageClick(imageUrl) {
    setClickedImageUrl(imageUrl);
    setShowBirdGallery(true);
  }

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return isLoading ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <ReactLoading type="spokes" height={100} width={100} />
    </div>
  ) : (
    <div className="flex flex-col items-center max-w-[400px] md:mx-auto p-2">
      <div className=" flex flex-wrap justify-center gap-2">
        {photoElements}
      </div>
      <div className="mt-4">
        {Array.from({ length: totalPageCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mr-1 text-white px-1 md:text-xl ${
              currentPage === index + 1 ? "bg-blue-500" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
