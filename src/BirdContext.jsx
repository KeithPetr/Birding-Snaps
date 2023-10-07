/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { auth } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const BirdContext = createContext();

export { BirdContext };

export default function BirdProvider({ children }) {
  const [user] = useAuthState(auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBirdImage, setSelectedBirdImage] = useState(null);
  const [firstImageUrls, setFirstImageUrls] = useState(null);
  const [getLetterResults, setGetLetterResults] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [matchingImages, setMatchingImages] = useState([]);
  const [displayBirdDetails, setDisplayBirdDetails] = useState(false);
  const [selectedBirdName, setSelectedBirdName] = useState("");
  const [showBirdGallery, setShowBirdGallery] = useState(false);
  const [clickedImageUrl, setClickedImageUrl] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [imageFavorites, setImageFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favCurrentIndex, setFavCurrentIndex] = useState(0);

  return (
    <BirdContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
        favCurrentIndex,
        setFavCurrentIndex,
        isFavorited,
        setIsFavorited,
        showFavorites,
        setShowFavorites,
        user,
        imageFavorites,
        setImageFavorites,
        showLoginModal,
        setShowLoginModal,
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
        setSelectedBirdName,
        showBirdGallery,
        setShowBirdGallery,
        clickedImageUrl,
        setClickedImageUrl,
      }}
    >
      {children}
    </BirdContext.Provider>
  );
}
