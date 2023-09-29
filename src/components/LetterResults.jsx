import { useContext } from "react";
import { BirdContext } from "../BirdContext";
import { getStorage, ref, listAll } from "firebase/storage";
import app from "../../firebase.config.js";

export default function LetterResults() {
  const value = useContext(BirdContext);
  const {
    firstImageUrls,
    setGetLetterResults,
    setMatchingImages,
    isLoading,
    setIsLoading,
    setDisplayBirdDetails,
    setSelectedBirdName
  } = value;
  const entries = Object.entries(firstImageUrls);
  const firstLetter = entries[0]?.[0].charAt(0);
  const storage = getStorage(app);
  console.log("entries: ", entries);
  console.log("loading: ", isLoading);

  async function searchImagesByName(query) {
    setIsLoading(true);
    const storageRef = ref(storage, `${query}`); // Set the path to your images
    console.log("storageRef: ", storageRef);

    try {
      const result = await listAll(storageRef);
      setMatchingImages(result);
      setDisplayBirdDetails(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching for images:", error);
      setIsLoading(false);
      return [];
    }
  }

  return (
    <>
      <h1 className="text-6xl text-center my-2 text-blue-100">{firstLetter}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {entries.map(([key, value], index) => (
            <div
              key={index}
              className="flex items-center bg-blue-800 hover:bg-blue-500 px-2 py-2 mb-2 mx-2 cursor-pointer"
              onClick={() => {
                setGetLetterResults(false);
                searchImagesByName(key);
                setSelectedBirdName(key);
              }}
            >
              <img className="w-24 h-20" src={value} />
              <div className="ml-4">{key}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}