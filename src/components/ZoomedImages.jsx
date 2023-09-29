import { BirdContext } from "../BirdContext";
import { useContext, useState, useEffect } from "react";

export default function ZoomedImages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const value = useContext(BirdContext);
  const { setShowBirdGallery, clickedImageUrl, imageUrls } = value;

  useEffect(() => {
    // Update the current index when the clicked image URL changes
    const filteredIndex = imageUrls.findIndex((image) => clickedImageUrl === image.url);
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
      <div className="w-[425px] h-[375px] border z-30 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <img className="h-full w-full" src={imageUrls[currentIndex]?.url} />
        <div className="flex justify-between">
          <div
            className="bg-gray-100 cursor-pointer border px-4 py-2 mt-2 w-1/6 text-center rounded-full"
            onClick={prevImage}
          >
            Prev
          </div>
          <div
            className="bg-gray-100 cursor-pointer border px-4 py-2 mt-2 w-1/6 text-center rounded-full"
            onClick={nextImage}
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
}
