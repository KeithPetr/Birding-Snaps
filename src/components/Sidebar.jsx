import { useContext, useEffect, useState } from 'react';
import LetterBox from './LetterBox';
import { Button } from "@material-tailwind/react";
import { BirdContext } from '../BirdContext';
import { listAll, ref, getStorage } from 'firebase/storage';
import {app} from "../../firebase.config.js";

export default function Sidebar() {
  const value = useContext(BirdContext);
  const { setIsModalVisible, user, showFavorites, setShowFavorites, setGetLetterResults } = value;
  const [filteredLetters, setFilteredLetters] = useState([]); // State to store filtered letters

  // Initialize Firebase storage
  const storage = getStorage(app);

  useEffect(() => {
    // Fetch the list of bird folders from Firebase storage
    async function fetchBirdFolders() {
      const storageRef = ref(storage, "");
      try {
        const result = await listAll(storageRef);
        const birdFolderNames = result.prefixes.map((birdFolder) => birdFolder.name);     

        // Extract unique starting letters from bird folder names
        const uniqueStartingLetters = [...new Set(birdFolderNames.map((name) => name.charAt(0).toUpperCase()))];
       
        // Update the filtered letters state with letters that have matching bird folders
        setFilteredLetters(uniqueStartingLetters);
      } catch (error) {
        console.error("Error fetching bird folders: ", error);
      }
    }

    fetchBirdFolders();
  }, [storage]);

  const letterBoxes = filteredLetters.map((letter) => <LetterBox key={letter} letter={letter} />);

  const handleSearchClick = () => {
    setIsModalVisible((prev) => !prev);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
    setGetLetterResults(false);
  };

  return (
    <div className="bg-blue-600 w-4/12 flex flex-col items-center pt-4 pb-4">
      <Button className="bg-blue-300 text-gray-50 border-2 border-blue-100 w-11/12 p-2" onClick={handleSearchClick}>Search</Button>
      {user && <Button className="bg-blue-300 text-gray-50 border-2 border-blue-100 w-11/12 p-2 mt-2" onClick={toggleFavorites}>Favorites</Button>}
      <div className="flex flex-wrap justify-center mt-4 gap-x-2 gap-y-2">
        {letterBoxes}
      </div>
    </div>
  );
}
