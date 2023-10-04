import { BirdContext } from "../BirdContext";
import { useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faStar } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@material-tailwind/react";

export default function ZoomedImages() {
  const [user] = useAuthState(auth);
  const imgRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const value = useContext(BirdContext);
  const { setShowBirdGallery, clickedImageUrl, imageUrls, setShowLoginModal } = value;

  console.log("clickedImageUrl", imageUrls[currentIndex]?.url);

  useEffect(() => {
    // Update the current index when the clicked image URL changes
    const filteredIndex = imageUrls.findIndex(
      (image) => clickedImageUrl === image.url
    );
    setCurrentIndex(filteredIndex);
  }, [clickedImageUrl, imageUrls]);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.scrollIntoView({ behavior: "smooth" });
    }
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

  function isSignedIn() {
    if (!user) {
      setShowLoginModal(true); // Show the LoginModal when the user is not signed in
      setShowBirdGallery(false)
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900 opacity-50 z-20"
        onClick={() => setShowBirdGallery(false)}
      ></div>
      <div className="w-11/12 z-30 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="border relative">
          <img
            className="h-full w-full border"
            src={imageUrls[currentIndex]?.url}
            ref={imgRef}
          />

          <div className="absolute text-xl bottom-0 right-2 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-600 cursor-pointer"
              onClick={isSignedIn}
            />
            <a
              href={imageUrls[currentIndex]?.url}
              download="image.jpg"
              target="blank_"
            >
              <FontAwesomeIcon
                icon={faDownload}
                className="text-blue-500 bg-gray-100 cursor-pointer"
              />
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center mt-1">
          <div
            className="cursor-pointer text-4xl text-center"
            onClick={prevImage}
          >
            ⬅️
          </div>
          <Button 
          className="bg-blue-300 text-gray-50 border-2 border-blue-100 cursor-pointer py-2 px-2"
          onClick={() => setShowBirdGallery(false)}
          >Close</Button>
          <div
            className="cursor-pointer text-4xl text-center"
            onClick={nextImage}
          >
            ➡️
          </div>
        </div>
      </div>
    </>
  );
}
