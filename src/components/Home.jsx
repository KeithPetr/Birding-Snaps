/* eslint-disable react/prop-types */
import Gallery from "./Gallery";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Home({ setEnter }) {
  return (
    <>
      <div className="">
        <Header setEnter={setEnter} />
        <div className="flex">
          <SideBar />
          <Gallery />
        </div>
      </div>
    </>
  );
}
