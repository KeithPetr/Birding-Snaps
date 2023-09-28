/* eslint-disable react/prop-types */
import { useState } from "react";
import Gallery from "./Gallery";
import Header from "./Header";
import SideBar from "./SideBar";
import SearchModal from "./SearchModal";

export default function Home({ setEnter, enter }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [matchingImages, setMatchingImages] = useState([]);

  return (
    <>
      <div className="relative flex flex-col h-screen">
        <Header setEnter={setEnter} />
        <div className="flex flex-grow">
          <SideBar
            matchingImages={matchingImages}
            setMatchingImages={setMatchingImages}
          />
          <Gallery
            enter={enter}
            matchingImages={matchingImages}
            setMatchingImages={setMatchingImages}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
        </div>
        <SearchModal
          matchingImages={matchingImages}
          setMatchingImages={setMatchingImages}
          imageUrls={imageUrls}
        />
      </div>
    </>
  );
}
