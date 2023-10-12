/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { BirdContext } from "../BirdContext";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase.config";
import GalleryDetails from "./GalleryDetails";
import PhotoDisplay from "./PhotoDisplay";
import LetterResults from "./LetterResults";
import Favorites from "./Favorites";


export default function Gallery({ enter }) {
  const value = useContext(BirdContext);
  const { setImageFavorites, user, getLetterResults, showFavorites } = value;
  const userUid = user ? user.uid : null;


  useEffect(() => {
    // Check if userUid is not null before using it in the ref
    if (userUid) {
      const favDB = ref(database, `favorites/${userUid}`);

      onValue(favDB, function (snapshot) {
        const data = snapshot.val();
        const favoritesArray = data ? Object.values(data) : [];
        setImageFavorites(favoritesArray);
      });
    }
  }, [userUid, setImageFavorites]);

  return (
    <div className="bg-gray-900 w-3/4 pb-4">
        {getLetterResults && <LetterResults />}
        {showFavorites && user && <Favorites /> }
         {!getLetterResults && !showFavorites && <GalleryDetails enter={enter} /> } 
         {!getLetterResults && !showFavorites && <PhotoDisplay />} 
    </div>
  );
}
