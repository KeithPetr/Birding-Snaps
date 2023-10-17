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
      <h1 className="text-outline text-6xl text-center my-2 text-blue-100">{firstLetter}</h1>

      <div className="max-w[1160px] flex flex-col items-center">
        {entries.map(([key, value], index) => (
          <div
            key={index}
            className="flex justify-between text-center items-center my-4 pr-4 w-9/12 min-w-[200px]
            max-w-[450px] cursor-pointer rounded border-2 text-white hover:border-blue-200 hover:text-blue-200"
            onClick={() => {
              setGetLetterResults(false);
              searchImagesByName(key);
              setSelectedBirdName(key);
            }}
          >
            <img className="w-24 h-20 sm:w-36 sm:h-28 md:w-40 md:h-36 rounded" src={value} />
            <div className="text-outline text-md sm:text-lg md:text-2xl ml-2">{key}</div>
          </div>
        ))}
      </div>
    </>
  );
}
