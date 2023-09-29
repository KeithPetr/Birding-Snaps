/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const BirdContext = createContext();

export { BirdContext };

export default function BirdProvider({ children }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBirdImage, setSelectedBirdImage] = useState(null);
  const [firstImageUrls, setFirstImageUrls] = useState(null);
  const [getLetterResults, setGetLetterResults] = useState(false)
  const [imageUrls, setImageUrls] = useState([]);
  const [matchingImages, setMatchingImages] = useState([]);
  const [displayBirdDetails, setDisplayBirdDetails] = useState(false)
  const [selectedBirdName, setSelectedBirdName] = useState("");

  return (
    <BirdContext.Provider
      value={{
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
        firstImageUrls,
        setFirstImageUrls,
        getLetterResults,
        setGetLetterResults,
        imageUrls,
        setImageUrls,
        matchingImages,
        setMatchingImages,
        displayBirdDetails,
        setDisplayBirdDetails,
        selectedBirdName,
        setSelectedBirdName
      }}
    >
      {children}
    </BirdContext.Provider>
  );
}
