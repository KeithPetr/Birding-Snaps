/* eslint-disable react/prop-types */
import { useContext } from "react";
import { BirdContext } from "../BirdContext";
import GalleryDetails from "./GalleryDetails";
import PhotoDisplay from "./PhotoDisplay";
import LetterResults from "./LetterResults";

export default function Gallery({ enter }) {
  const value = useContext(BirdContext);
  const { getLetterResults, isLoading } = value;
  console.log("loading: ", isLoading)

  return (
    <div className="bg-gray-900 w-3/4">
      { getLetterResults ? (
        <LetterResults />
      ) : (
        <>
          <GalleryDetails enter={enter} />
          <PhotoDisplay />
        </>
      )}
    </div>
  );
}
