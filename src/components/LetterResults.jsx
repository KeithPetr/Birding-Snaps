import { useContext } from "react";
import { BirdContext } from "../BirdContext";
import { getStorage, ref, listAll } from "firebase/storage";
import { app } from "../../firebase.config.js";

export default function LetterResults() {
  const value = useContext(BirdContext);
  const {
    firstImageUrls,
    setGetLetterResults,
    setMatchingImages,
    setDisplayBirdDetails,
    setSelectedBirdName,
    setWikiQuery,
    setIsLoading,
  } = value;
  const entries = Object.entries(firstImageUrls);
  const firstLetter = entries[0]?.[0].charAt(0);
  const storage = getStorage(app);

  async function searchImagesByName(query) {
    const storageRef = ref(storage, `${query}`); // Set the path to your images

    try {
      const result = await listAll(storageRef);
      setIsLoading(true)
      setMatchingImages(null)
      setTimeout(() => {
        setMatchingImages(result);
        setDisplayBirdDetails(true);
        setWikiQuery(query)
        setIsLoading(false)
      }, 2000)
      
    } catch (error) {
      console.error("Error searching for images:", error);

      return [];
    }
  }

  return (
    <>
      <h1 className="text-6xl text-center my-2 text-blue-100">{firstLetter}</h1>

      <div>
        {entries.map(([key, value], index) => (
          <div
            key={index}
            className="flex text-center items-center bg-blue-800 hover:bg-blue-500 px-2 py-2 mb-2 mx-2 cursor-pointer"
            onClick={() => {
              setGetLetterResults(false);
              searchImagesByName(key);
              setSelectedBirdName(key);
            }}
          >
            <img className="w-24 h-20" src={value} />
            <div className="ml-2">{key}</div>
          </div>
        ))}
      </div>
    </>
  );
}
