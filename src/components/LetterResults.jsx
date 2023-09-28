import { useContext } from "react";
import { BirdContext } from "../BirdContext";

export default function LetterResults() {
  const value = useContext(BirdContext);
  const {firstImageUrls} = value;
  const entries = Object.entries(firstImageUrls)
  console.log('entries: ', entries)

  const allLetterResults = entries.map(([key, value], index) => {
    return (
    <div
      key={index}
      className="flex items-center bg-blue-800 hover:bg-blue-500 px-2 py-2 cursor-pointer border-b"
    >
      <img className="w-24 h-20" src={value} />
      <div className="ml-4">{key}</div>
    </div>
    )
  })

  return (
    <>{allLetterResults}</>
  );
}
