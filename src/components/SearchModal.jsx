/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getStorage, ref, listAll } from "firebase/storage";
import app from "../../firebase.config.js";

export default function SearchModal({
  isModalVisible,
  setIsModalVisible,
  matchingImages,
  setMatchingImages,
}) {
  const [searchTerms, setSearchTerms] = useState("");
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const storage = getStorage(app);

  async function filterResults(query) {
    console.log("query", query);
    const storageRef = ref(storage, "");
    try {
      const result = await listAll(storageRef);
      console.log("result", result);
      const matchingBirds = result.prefixes.filter((item) =>
        item.fullPath.toLowerCase().includes(query.toLowerCase())
      );
      console.log("Matching bird names: ", matchingBirds);
      const birdNames = matchingBirds.map((bird) => bird.fullPath);
      console.log("birdNames: ", birdNames);
      setFilteredBirds(birdNames);
      setIsLoading(false);
      console.log("filtered birds: ", filteredBirds);
    } catch (error) {
      console.error("Error filtering results: ", error);
    }
  }

  // Function to search for images by name
  async function searchImagesByName(query) {
    const storageRef = ref(storage, `${query}`); // Set the path to your images

    try {
      const result = await listAll(storageRef);
      setMatchingImages(result);
      console.log("matching images: ", matchingImages);
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
    }
  }

  function closePopUp() {
    setIsModalVisible(false);
    setSearchTerms("");
  }

  function enterSearchTerms(name) {
    setSearchTerms(name);
    setTimeout(function () {
      searchImagesByName(name);
      setIsModalVisible(false);
      setSearchTerms("");
    }, 1000);
  }

  const hiddenVal = isModalVisible ? "" : "hidden";

  return (
    <>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-900 opacity-50 z-20"></div>
      )}

      <div
        className={`w-11/12 h-64 mb-2 px-4 bg-blue-300 z-30 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2  ${hiddenVal}`}
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
            {filteredBirds.map((bird, index) => (
              <div
                key={index}
                className="bg-blue-800 hover:bg-blue-500 px-2 py-1 cursor-pointer"
                onClick={() => enterSearchTerms(bird)}
              >
                {bird}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
