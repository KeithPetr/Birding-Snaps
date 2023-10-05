import { BirdContext } from "../BirdContext";
import { useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faStar } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase.config";
import { Button } from "@material-tailwind/react";
import { ref, push, remove, get, child, set } from "firebase/database";

export default function ZoomedImages() {
  const [isFavorited, setIsFavorited] = useState(false);
  const imgRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const value = useContext(BirdContext);
  const {
    setShowBirdGallery,
    clickedImageUrl,
    imageUrls,
    setShowLoginModal,
    imageFavorites,
    user,
  } = value;
  const userUid = user ? user.uid : null;
  const favDB = ref(database, `favorites/${userUid}`);

  useEffect(() => {
    if (user) {
      setIsFavorited(imageFavorites.includes(imageUrls[currentIndex]?.url));
      console.log("hasBeenFavorited", isFavorited);
    }
  }, [imageUrls[currentIndex]?.url]);

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

  async function toggleFavorite() {
    if (user) {
      const imageUrl = imageUrls[currentIndex]?.url;
      const snapshot = await get(favDB);

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Find the key associated with the image URL
        const keyToDelete = Object.keys(data).find(
          (key) => data[key] === imageUrl
        );

        if (keyToDelete) {
          // If already favorited, remove from Firebase using the key
          await remove(child(favDB, keyToDelete));
          setIsFavorited(false); // Set the star icon to white
        } else {
          // If not favorited, add to Firebase
          const newRef = push(favDB);
          const newKey = newRef.key;
          await set(child(favDB, newKey), imageUrl);
          setIsFavorited(true); // Set the star icon to yellow
        }
      } else {
        // If no favorites data exists, create a new entry
        const newRef = push(favDB);
        const newKey = newRef.key;
        await set(child(favDB, newKey), imageUrl);
        setIsFavorited(true); // Set the star icon to yellow
      }
    } else {
      setShowLoginModal(true);
      setShowBirdGallery(false);
    }
  }

  function openImageInNewTab() {
    const newTab = window.open(
      `image.html?imageUrl=${encodeURIComponent(imageUrls[currentIndex]?.url)}`,
      "_blank"
    );
    if (newTab) {
      newTab.focus();
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
            className="h-full w-full border select-none"
            src={imageUrls[currentIndex]?.url}
            ref={imgRef}
          />

          <div className="absolute text-xl bottom-0 right-2 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faStar}
              className={`cursor-pointer ${
                isFavorited ? "text-yellow-500" : "text-white"
              }`}
              onClick={toggleFavorite}
            />
            <a href="#" onClick={openImageInNewTab}>
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
          >
            Close
          </Button>
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
