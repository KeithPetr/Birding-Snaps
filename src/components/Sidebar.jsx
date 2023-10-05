/* eslint-disable react/prop-types */
import LetterBox from './LetterBox';
import { Button } from "@material-tailwind/react";
import { BirdContext } from '../BirdContext';
import { useContext } from 'react';

export default function Sidebar() {
  const letters =  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const letterBoxes = letters.map(letter => <LetterBox key={letter} letter={letter}/>)
  const value = useContext(BirdContext)
  const {setIsModalVisible, user, showFavorites, setShowFavorites, setGetLetterResults} = value

const handleSearchClick = () => {
  setIsModalVisible(prev => !prev);
};

const toggleFavorites = () => {
  setShowFavorites(!showFavorites)
  setGetLetterResults(false)
}

  return (
      <div className="bg-blue-600 w-4/12 flex flex-col items-center pt-4 pb-4">
        <Button className="bg-blue-300 text-gray-50 border-2 border-blue-100 w-11/12 p-2" onClick={handleSearchClick}>Search</Button>
        <div className="flex flex-wrap justify-center mt-4 gap-x-2 gap-y-2">
          {letterBoxes}
        </div>
        {user && <Button className="bg-blue-300 text-gray-50 border-2 border-blue-100 w-11/12 p-2 mt-4" onClick={toggleFavorites}>Favorites</Button>}
      </div>
  );
}
