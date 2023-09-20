/* eslint-disable react/prop-types */
import Gallery from "./Gallery";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Home({ setEnter, enter, matchingImages, setMatchingImages }) {
  
  return (
    <>
      <div className="">
        <Header setEnter={setEnter} />
        <div className="flex">
          <SideBar matchingImages={matchingImages} setMatchingImages={setMatchingImages}/>
          <Gallery enter={enter} matchingImages={matchingImages} setMatchingImages={setMatchingImages}/>
        </div>
      </div>
    </>
  );
}
