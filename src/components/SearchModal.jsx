/* eslint-disable react/prop-types */
import { useEffect, useContext, useRef, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase.config.js";
import { BirdContext } from "../BirdContext";
import ReactLoading from "react-loading";

export default function SearchModal() {
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const searchInputRef = useRef(null);
  const value = useContext(BirdContext);
  const {
    setShowTodaysFavorites,
    isModalVisible,
    setIsModalVisible,
    searchTerms,
    setSearchTerms,
    filteredBirds,
    setFilteredBirds,
    selectedBirdImage,
    setSelectedBirdImage,
    setGetLetterResults,
    setMatchingImages,
    setSelectedBirdName,
    setDisplayBirdDetails,
    setWikiQuery,
    wikiQuery,
    setBirdIntro,
    setShowFavorites,
    setIsLoading,
    setBirdData,
  } = value;

  const storage = getStorage(app);

  async function filterResults(query) {
    if (query.length >= 4) {
      setIsFilterLoading(true);
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
        setIsFilterLoading(false);
      } catch (error) {
        console.error("Error filtering results: ", error);
      }
    } else {
      setFilteredBirds([]);
    }
  }

  // Helper function to capitalize the first letter of each word
  function capitalizeWords(query) {
    const splitTest = query.split(" ");
    const joinTest = splitTest.join("_");
    const wikiQuery = joinTest.charAt(0).toUpperCase() + joinTest.slice(1);
    setWikiQuery(wikiQuery);
    const capitalizedQuery = query
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
      console.log(capitalizedQuery);
      return capitalizedQuery
  }

  // Get information from Wikipedia ---------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiQuery}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        setBirdData(data)
        setBirdIntro(data.extract);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    fetchData();
  }, [wikiQuery, setBirdIntro]);

  // Function to search for images by name -------------------------
  async function searchImagesByName(query) {
    const capitalizedQuery = capitalizeWords(query);
    setSelectedBirdName(capitalizedQuery);
    const storageRef = ref(storage, `${capitalizedQuery}`); // Set the path to your images
    try {
      const result = await listAll(storageRef);
      setMatchingImages(null);
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

      const isMatching = filteredBirds.some(
        (bird) => bird.toLowerCase() === trimmedSearchTerms
      );

      if (!isMatching) {
        // Prevent Enter keypress if there are no matching bird folders
        event.preventDefault();
        console.log("No matching birds");
        return;
      }

      setIsLoading(true);
      setIsModalVisible(false);
      setShowTodaysFavorites(false);
      setTimeout(() => {
        searchImagesByName(trimmedSearchTerms);
        setSearchTerms("");
        setGetLetterResults(false);
        setDisplayBirdDetails(true);
        setShowFavorites(false);
        setIsLoading(false);
      }, 2000);
    }
  }

  function closePopUp() {
    setIsModalVisible(false);
    setSearchTerms("");
  }

  function enterSearchTerms(name) {
    setIsLoading(true);
    setIsModalVisible(false);
    setGetLetterResults(false);
    setShowFavorites(false);
    searchImagesByName(name);
    setDisplayBirdDetails(true);
    setShowTodaysFavorites(false);

    setTimeout(function () {
      setSearchTerms(name);
      setSelectedBirdName(name);
      setSearchTerms("");
      setIsLoading(false);
    }, 1500);
  }

  const hiddenVal = isModalVisible ? "" : "hidden";

  return (
    <>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-900 opacity-50 z-20"></div>
      )}

      <div
        className={`w-11/12 mb-2 px-4 bg-blue-200 z-30 absolute inset-1/2 transform -translate-x-1/2 -translate-y-[200px] ${hiddenVal} max-w-[500px]`}
      >
        <div className="flex justify-end pr-1">
          <div
            className="text-red-300 w-4 cursor-pointer font-extrabold text-2xl text-outline"
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
          placeholder="Enter at least 4 letters..."
          ref={searchInputRef}
        />
        {searchTerms.trim().length === 0 ? ( // Check if the search term has no real characters
          ""
        ) : isFilterLoading ? (
          <div className="mx-auto bg-blue-800 border-b">
            <ReactLoading
              className="mx-auto py-4"
              type="spokes"
              height="30%"
              width="30%"
            />
          </div>
        ) : (
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {filteredBirds.map((bird, index) => {
              return (
                <div
                  key={index}
                  className="text-outline flex items-center bg-blue-400 hover:bg-blue-700 px-2 py-2 cursor-pointer border-b"
                  onClick={() => enterSearchTerms(bird)}
                >
                  <img className="w-24 h-20 md:w-32 md:h-28" src={selectedBirdImage[bird]} />
                  <div className="ml-4 text-white text-lg text-xl md:text-2xl">{bird}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
