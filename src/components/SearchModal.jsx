/* eslint-disable react/prop-types */
import { useEffect, useContext } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import app from "../../firebase.config.js";
import { BirdContext } from "../BirdContext";

export default function SearchModal() {
  const value = useContext(BirdContext);
  const {
    isModalVisible,
    setIsModalVisible,
    searchTerms,
    setSearchTerms,
    filteredBirds,
    setFilteredBirds,
    isLoading,
    setIsLoading,
    selectedBirdImage,
    setSelectedBirdImage,
    setGetLetterResults,
    setMatchingImages
  } = value;

  const storage = getStorage(app);

  async function filterResults(query) {
    const storageRef = ref(storage, "");
    try {
      const result = await listAll(storageRef);
      console.log("result: ", result);
      const matchingBirds = result.prefixes.filter((item) =>
        item.fullPath.toLowerCase().includes(query.toLowerCase())
      );
      console.log("matchingBirds:, ", matchingBirds);
      const birdNames = matchingBirds.map((bird) => bird.fullPath);
      console.log("birdnames: ", birdNames);

      // Fetch and store the first image URL for each bird name
      const firstImageUrls = {};
      for (const birdName of birdNames) {
        const birdImageRef = ref(storage, birdName);
        const birdImage = await listAll(birdImageRef);
        if (birdImage && birdImage.items.length > 0) {
          const imageUrl = await getDownloadURL(birdImage.items[0]);
          firstImageUrls[birdName] = imageUrl;
        }
      }
      console.log(firstImageUrls);

      setSelectedBirdImage(firstImageUrls);
      setFilteredBirds(birdNames);
      setIsLoading(false);
    } catch (error) {
      console.error("Error filtering results: ", error);
    }
  }

  // Function to search for images by name
  async function searchImagesByName(query) {
    const storageRef = ref(storage, `${query}`); // Set the path to your images
    console.log("storageRef: ", storageRef);

    try {
      const result = await listAll(storageRef);
      setMatchingImages(result);
    } catch (error) {
      console.error("Error searching for images:", error);
      return [];
    }
  }

  useEffect(() => {
    // Call filterResults with the updated searchTerms
    if (searchTerms) {
      filterResults(searchTerms);
    } else {
      setFilteredBirds([]);
    }
  }, [searchTerms]);

  function handleInput(event) {
    setSearchTerms(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      searchImagesByName(searchTerms);
      setIsModalVisible(false);
      setSearchTerms("");
      setGetLetterResults(false)
    }
  }

  function closePopUp() {
    setIsModalVisible(false);
    setSearchTerms("");
  }

  function enterSearchTerms(name) {
    setGetLetterResults(false)
    setSearchTerms(name);
    setTimeout(function () {
      searchImagesByName(name);
      setIsModalVisible(false);
      setSearchTerms("");
    }, 500);
  }

  const hiddenVal = isModalVisible ? "" : "hidden";

  return (
    <>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-900 opacity-50 z-20"></div>
      )}

      <div
        className={`w-11/12 h-64 mb-2 px-4 bg-blue-200 z-30 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2  ${hiddenVal}`}
      >
        <div className="flex justify-end pr-1">
          <div
            className="text-red-900 w-4 cursor-pointer font-extrabold text-2xl"
            onClick={closePopUp}
          >
            X
          </div>
        </div>
        <input
          className="w-full border-2 px-2 py-1"
          onChange={handleInput}
          value={searchTerms}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {filteredBirds.map((bird, index) => {
              console.log("bird: ", bird);
              return (
                <div
                  key={index}
                  className="flex items-center bg-blue-800 hover:bg-blue-500 px-2 py-2 cursor-pointer border-b"
                  onClick={() => enterSearchTerms(bird)}
                >
                  <img className="w-24 h-20" src={selectedBirdImage[bird]} />
                  <div className="ml-4">{bird}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
