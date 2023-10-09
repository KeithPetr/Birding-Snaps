/* eslint-disable react/prop-types */
import { useEffect, useContext, useRef } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase.config.js";
import { BirdContext } from "../BirdContext";

export default function SearchModal() {
  const searchInputRef = useRef(null);
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
    setMatchingImages,
    setSelectedBirdName,
    setDisplayBirdDetails,
  } = value;

  const storage = getStorage(app);

  async function filterResults(query) {
    const storageRef = ref(storage, "");
    try {
      const result = await listAll(storageRef);
      
      const matchingBirds = result.prefixes.filter((item) =>
        item.fullPath.toLowerCase().includes(query.toLowerCase())
      );
     
      const birdNames = matchingBirds.map((bird) => bird.fullPath);
     

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
 

      setSelectedBirdImage(firstImageUrls);
      setFilteredBirds(birdNames);
      setIsLoading(false);
    } catch (error) {
      console.error("Error filtering results: ", error);
    }
  }

// Helper function to capitalize the first letter of each word
function capitalizeWords(query) {
  return query
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

  // Function to search for images by name
  async function searchImagesByName(query) {
    const capitalizedQuery = capitalizeWords(query);
    setSelectedBirdName(capitalizedQuery);
    const storageRef = ref(storage, `${capitalizedQuery}`); // Set the path to your images
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

  useEffect(() => {
    // Set focus on the search input after the search button is clicked
    if (isModalVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isModalVisible]);

  function handleInput(event) {
    setSearchTerms(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const trimmedSearchTerms = searchTerms.trim().toLowerCase();
  
      const isMatching = filteredBirds.some((bird) =>
        bird.toLowerCase() === trimmedSearchTerms
      );
  
      if (!isMatching) {
        // Prevent Enter keypress if there are no matching bird folders
        event.preventDefault();
        console.log("No matching birds");
        return;
      }
  
      searchImagesByName(trimmedSearchTerms);
      setIsModalVisible(false);
      setSearchTerms("");
      setGetLetterResults(false);
      setDisplayBirdDetails(true);
    }
  }

  function closePopUp() {
    setIsModalVisible(false);
    setSearchTerms("");
  }

  function enterSearchTerms(name) {
    setGetLetterResults(false);
    setSearchTerms(name);
    setDisplayBirdDetails(true);
    setTimeout(function () {
      searchImagesByName(name);
      setSelectedBirdName(name);
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
        className={`w-11/12 mb-2 px-4 bg-blue-200 z-30 absolute inset-1/2 transform -translate-x-1/2 -translate-y-[100px] ${hiddenVal}`}
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
          ref={searchInputRef}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {filteredBirds.map((bird, index) => {
              
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
