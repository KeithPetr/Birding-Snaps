import CarouselDefault from "./CarouselDefault";

export default function Gallery() {
  return (
    <div className="bg-gray-900 w-3/4 flex justify-center">
      <div className="w-48 h-32 border-gray-100 border-2 shadow-md shadow-gray-400">
        <h1>Bald Eagle</h1>
        <CarouselDefault />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
    </div>
  );
}
