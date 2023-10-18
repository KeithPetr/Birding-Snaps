import { BirdContext } from "../BirdContext";
import { useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase.config";
import { Button } from "@material-tailwind/react";
import { ref, push, remove, get, child, set } from "firebase/database";


export default function ZoomedImages() {
  const imgRef = useRef(null);
  const value = useContext(BirdContext);
  const {
    setShowBirdGallery,
    clickedImageUrl,
    imageUrls,
    setShowLoginModal,
    imageFavorites,
    user,
    showFavorites,
    isFavorited,
    setIsFavorited,
    currentIndex,
    setCurrentIndex,
    favCurrentIndex,
    setFavCurrentIndex,
    isLoading,
    setIsLoading,
    setShowImageFilters,
  } = value;
  const userUid = user ? user.uid : null;
  const favDB = ref(database, `favorites/${userUid}`);

  useEffect(() => {
    if (!user) {
      setIsFavorited(false);
    }
  }, [user, setIsFavorited]);

  useEffect(() => {
    if (user) {
      setIsFavorited(imageFavorites.includes(imageUrls[currentIndex]?.url));
    }
  }, [
    imageUrls,
    currentIndex,
    setIsFavorited,
    user,
    imageFavorites,
    favCurrentIndex,
  ]);

  useEffect(() => {
    // Update the current index when the clicked image URL changes
    if (!showFavorites) {
      setIsLoading(true);
      const filteredIndex = imageUrls.findIndex(
        (image) => clickedImageUrl === image.url
      );
      setCurrentIndex(filteredIndex);
      setIsLoading(false);
    }
  }, [clickedImageUrl, imageUrls]);

  useEffect(() => {
    setIsLoading(true);
    const filteredIndex = imageFavorites.findIndex(
      (image) => clickedImageUrl === image
    );
    setFavCurrentIndex(filteredIndex);
    setIsLoading(false);
  }, [clickedImageUrl, imageFavorites]);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [clickedImageUrl, imageUrls]);

  function prevImage() {
    setIsLoading(true);
    if (showFavorites) {
      const newIndex =
        (favCurrentIndex - 1 + imageFavorites.length) % imageFavorites.length;
      setFavCurrentIndex(newIndex);
    } else {
      const newIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
      setCurrentIndex(newIndex);
    }
    setIsLoading(false);
  }

  const nextImage = () => {
    setIsLoading(true);
    if (showFavorites) {
      const newIndex = (favCurrentIndex + 1) % imageFavorites.length;
      setFavCurrentIndex(newIndex);
    } else {
      const newIndex = (currentIndex + 1) % imageUrls.length;
      setCurrentIndex(newIndex);
    }
    setIsLoading(false);
  };

  async function removeFavorite() {
    setIsLoading(true);
    if (showFavorites) {
      if (user) {
        const imageUrl = imageFavorites[favCurrentIndex];
        const snapshot = await get(favDB);

        if (snapshot.exists()) {
          const data = snapshot.val();

          // Find the key associated with the image URL
          const keyToDelete = Object.keys(data).find(
            (key) => data[key] === imageUrl
          );

          if (keyToDelete) {
            // If already favorited, remove from Firebase using the key
            if (imageFavorites.length > 1) {
              await remove(child(favDB, keyToDelete));
              nextImage();
            } else {
              await remove(child(favDB, keyToDelete));
              setShowBirdGallery(false);
            }
          }
        }
      }
    }
    setIsLoading(false);
  }

  async function toggleFavorite() {
    if (user) {
      const imageUrl =
        imageUrls[currentIndex]?.url || imageFavorites[favCurrentIndex];
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
        } else {
          // If not favorited, add to Firebase
          const newRef = push(favDB);
          const newKey = newRef.key;
          await set(child(favDB, newKey), imageUrl);
        }
      } else {
        // If no favorites data exists, create a new entry
        const newRef = push(favDB);
        const newKey = newRef.key;
        await set(child(favDB, newKey), imageUrl);
      }
    } else {
      setShowLoginModal(true);
      setShowBirdGallery(false);
    }
  }

  function toggleImageFilters() {
    setShowImageFilters(true)
    setShowBirdGallery(false)
  }

  

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900 opacity-50 z-20"
        onClick={() => setShowBirdGallery(false)}
      ></div>

      <div
        className={`w-11/12 z-30 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 max-w-[650px]`}
      >
        <div className="border relative">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <img
              className="select-none"
              src={
                showFavorites
                  ? imageFavorites[favCurrentIndex]
                  : imageUrls[currentIndex]?.url
              }
              ref={imgRef}
            />
          )}

          <div
            className="absolute text-xl bottom-2 right-2 flex items-center gap-2 text-red-900 cursor-pointer"
            onClick={removeFavorite}
          >
            {showFavorites ? (
              "Remove"
            ) : (
              <FontAwesomeIcon
                icon={faStar}
                className={`${isFavorited ? "text-yellow-500" : "text-white"}`}
                onClick={toggleFavorite}
              />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-1 select-none">
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
        {showFavorites && (
          <Button
            className="bg-blue-300 text-gray-50 border-2 border-blue-100 cursor-pointer py-2 px-2 mx-auto mt-3 block"
            onClick={toggleImageFilters}
          >
            Add Image Filters
          </Button>
        )}
      </div>
    </>
  );
}
