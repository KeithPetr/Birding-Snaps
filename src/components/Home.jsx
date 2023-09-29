/* eslint-disable react/prop-types */
import Gallery from "./Gallery";
import Header from "./Header";
import SideBar from "./SideBar";
import SearchModal from "./SearchModal";
import { BirdContext } from "../BirdContext";
import { useContext } from "react";
import ZoomedImages from "./ZoomedImages";

export default function Home({ setEnter, enter }) {
  const value = useContext(BirdContext);
  const { showBirdGallery } = value;

  return (
    <div className="relative flex flex-col h-screen">
      <Header setEnter={setEnter} />
      {showBirdGallery && <ZoomedImages />}
      <>
        <div className="flex flex-grow">
          <SideBar />
          <Gallery enter={enter} />
        </div>
        <SearchModal />
      </>
    </div>
  );
}
