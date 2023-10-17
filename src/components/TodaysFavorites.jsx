import CarouselDefault from "./CarouselDefault";

export default function TodaysFavorites() {
    return (
    <div className="p-2 flex flex-col items-center w-11/12 max-w-[650px]
    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-outline text-blue-100 font-bold text-2xl sm:text-3xl text-center">
       Today&apos;s Favorites
      </h1>
      <div className="w-full h-30 mt-2 border-gray-100 border-2 shadow-md shadow-gray-400">
          <CarouselDefault />
      </div>
      <p className="text-outline mt-4 text-gray-100 text-md sm:text-lg md:text-xl text-center">
          Click on the sidebar menu to begin your search through my gallery!
      </p>
    </div>
  );
}