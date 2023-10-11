/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { BirdContext } from "../BirdContext";
import { getDownloadURL } from "firebase/storage";

export default function PhotoDisplay() {
  const value = useContext(BirdContext);
  const {
    matchingImages,
    imageUrls,
    setImageUrls,
    setShowBirdGallery,
    setClickedImageUrl,
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
        className="w-24 h-24 border hover:border-blue-500 hover:border-4 cursor-pointer"
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

  return (
    <div className="flex flex-col items-center">
      <div className=" flex flex-wrap justify-center gap-2">
        {photoElements}
      </div>
      <div className="mt-4">
        {Array.from({ length: totalPageCount }).map((_, index) => (
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
  );
}
