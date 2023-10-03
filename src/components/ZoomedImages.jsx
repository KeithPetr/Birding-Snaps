import { BirdContext } from "../BirdContext";
import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faStar } from "@fortawesome/free-solid-svg-icons";

export default function ZoomedImages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const value = useContext(BirdContext);
  const { setShowBirdGallery, clickedImageUrl, imageUrls } = value;

  console.log("clickedImageUrl", imageUrls[currentIndex]?.url);

  useEffect(() => {
    // Update the current index when the clicked image URL changes
    const filteredIndex = imageUrls.findIndex(
      (image) => clickedImageUrl === image.url
    );
    setCurrentIndex(filteredIndex);
  }, [clickedImageUrl, imageUrls]);

  function prevImage() {
    const newIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    setCurrentIndex(newIndex);
  }

  const nextImage = () => {
    // Increment the index and loop back to the first image if at the end
    const newIndex = (currentIndex + 1) % imageUrls.length;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900 opacity-50 z-20"
        onClick={() => setShowBirdGallery(false)}
      ></div>
      <div className="w-11/12  z-30 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="border relative">
          <img
            className="h-full w-full border"
            src={imageUrls[currentIndex]?.url}
            autoFocus
          />
          <div className="absolute text-xl top-[89%] left-[80%] flex gap-2">
            <FontAwesomeIcon 
              icon={faStar} 
              className="text-yellow-600" 
            />
            <FontAwesomeIcon
              icon={faDownload}
              className="text-blue-500 bg-gray-100"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div
            className="cursor-pointer mt-2 text-4xl text-center"
            onClick={prevImage}
          >
            ⬅️
          </div>
          <div
            className="cursor-pointer mt-2 text-4xl text-center"
            onClick={nextImage}
          >
            ➡️
          </div>
        </div>
      </div>
    </>
  );
}
