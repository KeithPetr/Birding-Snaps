/* eslint-disable react/prop-types */
import LetterBox from './LetterBox';
import { Button } from "@material-tailwind/react";

export default function Sidebar({setIsModalVisible}) {
  const letters =  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const letterBoxes = letters.map(letter => <LetterBox key={letter} letter={letter}/>)

const handleSearchClick = () => {
  setIsModalVisible(prev => !prev);
};

  return (
      <div className="bg-blue-800 w-4/12 flex flex-col items-center pt-4 pb-4 opacity-80">
        <Button className="bg-blue-300 text-gray-50 border-2 border-blue-100 mx-auto" onClick={handleSearchClick}>Search</Button>
        <div className="flex flex-wrap justify-center mt-4 gap-x-2 gap-y-2">
          {letterBoxes}
        </div>
      </div>
  );
}
