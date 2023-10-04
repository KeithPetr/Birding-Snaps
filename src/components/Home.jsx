/* eslint-disable react/prop-types */
import Gallery from "./Gallery";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import { BirdContext } from "../BirdContext";
import { useContext } from "react";
import ZoomedImages from "./ZoomedImages";
import LoginModal from "./LoginModal";

export default function Home({ setEnter, enter }) {
  const value = useContext(BirdContext);
  const { showBirdGallery, showLoginModal } = value;

  return (
    <div className="relative flex flex-col h-screen">
      <Header setEnter={setEnter} />
      {showLoginModal && <LoginModal />}
      {showBirdGallery && <ZoomedImages />}
      <>
        <div className="flex flex-grow">
          <Sidebar />
          <Gallery enter={enter} />
        </div>
        <SearchModal />
      </>
    </div>
  );
}
