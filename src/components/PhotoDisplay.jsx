/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { BirdContext } from "../BirdContext";
import { getDownloadURL } from "firebase/storage";

export default function PhotoDisplay() {
  const value = useContext(BirdContext);
  const {
    matchingImages,
    imageUrls,
    setImageUrls,
    isLoading,
    setIsLoading,
  } = value;

  useEffect(() => {
    const fetchImageUrls = async () => {
      setIsLoading(true); // Set loading to true while fetching images
      try {
        // Map over the items in matchingImages to get the download URLs
        const urls = await Promise.all(
          matchingImages.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );
        setImageUrls(urls);
        setIsLoading(false); // Set loading to false when images are fetched
      } catch (error) {
        console.error("Error fetching image URLs:", error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    // Call the function to fetch image URLs
    if (matchingImages && matchingImages.items) {
      fetchImageUrls();
    }
  }, [matchingImages, setIsLoading, setImageUrls]);

  const photoElements = imageUrls.map((url, index) => {
    return (
      <div
        key={index}
        className="w-24 h-24 border hover:border-blue-500 hover:border-2 cursor-pointer transition-transform hover:scale-105"
      >
        <img className="h-full w-full" src={url} alt={`Image ${index}`} />
      </div>
    );
  });

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2 pb-4 justify-center">
      {isLoading ? <p>Loading...</p> : photoElements}
    </div>
  );
}
