/* eslint-disable react/prop-types */
import Gallery from "./Gallery";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import { BirdContext } from "../BirdContext";
import { useContext } from "react";
import ZoomedImages from "./ZoomedImages";
import LoginModal from "./LoginModal";
import ImageEffects from "./ImageEffects";

export default function Home({ setEnter, enter }) {
  const value = useContext(BirdContext);
  const { showBirdGallery, showLoginModal, showImageFilters } = value;

  return (
    <div className="relative flex flex-col h-screen max-w-[1160px] min-[1160px] mx-auto ">
      <Header setEnter={setEnter} />
      {showLoginModal && <LoginModal />}
      {showBirdGallery && <ZoomedImages />}
      {showImageFilters && <ImageEffects />}
      <>
        <div className="flex flex-grow ">
          <Sidebar />
          <Gallery enter={enter} />
        </div>
        <SearchModal />
      </>
    </div>
  );
}
