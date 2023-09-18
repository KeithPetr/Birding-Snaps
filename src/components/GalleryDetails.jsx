/* eslint-disable react/prop-types */
import CarouselDefault from "./CarouselDefault";

export default function GalleryDetails({enter}) {
    

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-blue-400 font-bold text-2xl">Today&apos;s Favorites</h1>
      <div className="aspect-w-16 aspect-h-9 max-w-md mt-2 border-gray-100 border-2 shadow-md shadow-gray-400">
        <CarouselDefault enter={enter}/>
      </div>
      <p className="mt-4 text-blue-100 text-center">
        Click on the sidebar menu to begin your search through my gallery!
      </p>
    </div>
  );
}
