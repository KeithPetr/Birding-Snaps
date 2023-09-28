/* eslint-disable react/prop-types */
import Gallery from "./Gallery";
import Header from "./Header";
import SideBar from "./SideBar";
import SearchModal from "./SearchModal";

export default function Home({ setEnter, enter }) {

  return (
    <>
      <div className="relative flex flex-col h-screen">
        <Header setEnter={setEnter} />
        <div className="flex flex-grow">
          <SideBar />
          <Gallery enter={enter} />
        </div>
        <SearchModal />
      </div>
    </>
  );
}
