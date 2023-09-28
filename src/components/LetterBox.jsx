/* eslint-disable react/prop-types */
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import app from "../../firebase.config.js";
import { useContext, useEffect } from "react";
import { BirdContext } from "../BirdContext.jsx";

export default function LetterBox({ letter }) {
  const storage = getStorage(app);
  const value = useContext(BirdContext);
  const { firstImageUrls, setFirstImageUrls, setGetLetterResults } = value;

  async function filterResults(letter) {
    const storageRef = ref(storage, "");
    try {
      const result = await listAll(storageRef);
      console.log("result: ", result);
      const matchingBirds = result.prefixes.filter(
        (item) => item.fullPath.charAt(0) === letter
      );
      console.log("matchingBirds:, ", matchingBirds);
      const birdNames = matchingBirds.map((bird) => bird.fullPath);
      console.log("birdnames: ", birdNames);

      // Fetch and store the first image URL for each bird name
      const firstImages = {};
      for (const birdName of birdNames) {
        const birdImageRef = ref(storage, birdName);
        const birdImage = await listAll(birdImageRef);
        if (birdImage && birdImage.items.length > 0) {
          const imageUrl = await getDownloadURL(birdImage.items[0]);
          firstImages[birdName] = imageUrl;
        }
      }
      setFirstImageUrls(firstImages);
      setGetLetterResults(true)
    } catch (error) {
      console.error("Error filtering results: ", error);
    }
  }

  useEffect(() => {
    console.log("firstImagesUrls: ", firstImageUrls);
  }, [firstImageUrls]);

  return (
    <div
      className="border-2 h-10 w-10 flex justify-center items-center
        font-bold text-2xl text-blue-100 hover:bg-blue-900
        cursor-pointer"
      onClick={() => filterResults(letter)}
    >
      {letter}
    </div>
  );
}
