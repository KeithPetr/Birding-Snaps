/* eslint-disable react/prop-types */
import GalleryDetails from "./GalleryDetails";
import PhotoDisplay from "./PhotoDisplay";

export default function Gallery({
  enter,
  matchingImages,
  setMatchingImages,
  imageUrls,
  setImageUrls,
}) {
  console.log("Gallery: ", matchingImages);

  return (
    <div className="bg-gray-900 w-3/4">
      <GalleryDetails enter={enter} />
      <PhotoDisplay
        matchingImages={matchingImages}
        setMatchingImages={setMatchingImages}
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
      />
    </div>
  );
}
