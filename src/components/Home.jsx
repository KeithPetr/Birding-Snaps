/* eslint-disable react/prop-types */
import Header from "./Header";
import Sidebar from "./SideBar";

export default function Home({ setEnter }) {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-blue-500 to-blue-100">
      <Header setEnter={setEnter} />
      <Sidebar />
    </div>
  );
}
