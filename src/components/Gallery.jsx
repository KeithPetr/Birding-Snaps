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
    <div className="relative flex flex-col w-full pb-4 bg-black-opacity-30">
      {getLetterResults && <LetterResults />}
      {showFavorites && user && <Favorites />}
      <div className="flex flex-col items-center justify-center md:flex md:flex-row md:mx-4 md:items-center md:my-auto">
        {!getLetterResults && !showFavorites && (
          <GalleryDetails enter={enter} />
        )}
        {!getLetterResults && !showFavorites && <PhotoDisplay />}
      </div>
    </div>
  );
}
