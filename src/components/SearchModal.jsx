/* eslint-disable react/prop-types */
import { useState } from "react";
import { getStorage, ref, listAll } from "firebase/storage";
import app from "../../firebase.config.js";

export default function SearchModal({ isModalVisible, matchingImages, setMatchingImages }) {
  const [searchTerms, setSearchTerms] = useState("");
  

  const storage = getStorage(app);

  // Function to search for images by name
  async function searchImagesByName(query) {
    const storageRef = ref(storage, `${query}`); // Set the path to your images

    try {
      const result = await listAll(storageRef);
      setMatchingImages(result)
      console.log("matching images: ", matchingImages)
    } catch (error) {
      console.error("Error searching for images:", error);
      return [];
    }
  }

  function handleInput(event) {
    setSearchTerms(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        searchImagesByName(searchTerms)
    }
  };

  const hiddenVal = isModalVisible ? "" : "hidden";

  return (
    <div className={`w-11/12 mb-2 border ${hiddenVal}`}>
      <input className="w-full" onChange={handleInput} value={searchTerms} onKeyDown={handleKeyDown}/>
    </div>
  );
}
