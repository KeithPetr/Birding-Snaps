/* eslint-disable react/prop-types */
import { useState } from "react";
import Gallery from "./Gallery";
import Header from "./Header";
import SideBar from "./SideBar";
import SearchModal from "./SearchModal";

export default function Home({
  setEnter,
  enter,
  matchingImages,
  setMatchingImages,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="relative flex flex-col h-screen">
        <Header setEnter={setEnter} />
        <div className="flex flex-grow">
          <SideBar
            matchingImages={matchingImages}
            setMatchingImages={setMatchingImages}
            setIsModalVisible={setIsModalVisible}
          />
          <Gallery
            enter={enter}
            matchingImages={matchingImages}
            setMatchingImages={setMatchingImages}
          />
        </div>
        <SearchModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          matchingImages={matchingImages}
          setMatchingImages={setMatchingImages}
        />
      </div>
    </>
  );
}
