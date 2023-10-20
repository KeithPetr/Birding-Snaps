import { useContext, useEffect, useState } from "react";
import LetterBox from "./LetterBox";
import { Button } from "@material-tailwind/react";
import { BirdContext } from "../BirdContext";
import { listAll, ref, getStorage } from "firebase/storage";
import { app } from "../../firebase.config.js";

export default function Sidebar() {
  const value = useContext(BirdContext);
  const {
    setIsModalVisible,
    user,
    setShowFavorites,
    setGetLetterResults,
    setShowTodaysFavorites,
  } = value;
  const [filteredLetters, setFilteredLetters] = useState([]); // State to store filtered letters

  // Initialize Firebase storage
  const storage = getStorage(app);

  useEffect(() => {
    // Fetch the list of bird folders from Firebase storage
    async function fetchBirdFolders() {
      const storageRef = ref(storage, "");
      try {
        const result = await listAll(storageRef);
        const birdFolderNames = result.prefixes.map(
          (birdFolder) => birdFolder.name
        );

        // Extract unique starting letters from bird folder names
        const uniqueStartingLetters = [
          ...new Set(
            birdFolderNames.map((name) => name.charAt(0).toUpperCase())
          ),
        ];

        // Update the filtered letters state with letters that have matching bird folders
        setFilteredLetters(uniqueStartingLetters);
      } catch (error) {
        console.error("Error fetching bird folders: ", error);
      }
    }

    fetchBirdFolders();
  }, [storage]);

  const letterBoxes = filteredLetters.map((letter) => (
    <LetterBox key={letter} letter={letter} />
  ));

  const handleSearchClick = () => {
    setIsModalVisible((prev) => !prev);
  };

  const toggleFavorites = () => {
    setShowFavorites(true);
    setGetLetterResults(false);
    setShowTodaysFavorites(false);
  };

  return (
    <>
      <div className="flex flex-col items-center py-4 px-1 border-r w-6/12 max-w-[150px] bg-black-opacity-30">
        <Button
          className="bg-blue-400 text-gray-100 border-2 border-blue-200 w-11/12 p-2 md:text-sm"
          onClick={handleSearchClick}
        >
          Search
        </Button>
        {user && (
          <Button
            className="bg-blue-300 text-gray-50 border-2 border-blue-100 w-11/12 p-2 mt-2 md:text-sm"
            onClick={toggleFavorites}
          >
            Favorites
          </Button>
        )}
        <p className="text-white text-outline mt-3 text-center text-sm md:text-lg">Birds sorted by common names:</p>
        <div 
        className="flex flex-wrap justify-center max-w-[200px] mt-3 gap-x-2 gap-y-2 rounded"
        >
          {letterBoxes}
        </div>
      </div>
    </>
  );
}
