/* eslint-disable react/prop-types */
import GalleryDetails from "./GalleryDetails";
import PhotoDisplay from "./PhotoDisplay";
import LetterResults from "./LetterResults";
import { BirdContext } from "../BirdContext";
import { useContext } from "react";

export default function Gallery({
  enter,
  matchingImages,
  setMatchingImages,
  imageUrls,
  setImageUrls,
}) {
  const value = useContext(BirdContext);
  const { getLetterResults } = value;
  console.log("Gallery: ", matchingImages);

  return (
    <div className="bg-gray-900 w-3/4">
      {getLetterResults ? (
        <LetterResults />
      ) : (
        <>
          <GalleryDetails enter={enter} />
          <PhotoDisplay
            matchingImages={matchingImages}
            setMatchingImages={setMatchingImages}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
        </>
      )}
    </div>
  );
}
