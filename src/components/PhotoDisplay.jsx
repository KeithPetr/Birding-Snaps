/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getDownloadURL} from "firebase/storage";

export default function PhotoDisplay({matchingImages}) {
  const [imageUrls, setImageUrls] = useState([]);
  console.log("matching images", matchingImages.items);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        // Map over the items in matchingImages to get the download URLs
        const urls = await Promise.all(
          matchingImages.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );
        setImageUrls(urls);
        console.log("image urls", imageUrls);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    // Call the function to fetch image URLs
    if (matchingImages && matchingImages.items) {
      fetchImageUrls();
    }
  }, [matchingImages]);

  const photoElements = imageUrls.map((url, index) => {
    return (
      <div key={index} className="w-24 h-24 border">
        <img className="h-full w-full" src={url} alt={`Image ${index}`} />
      </div>
    );
  });

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2 pb-4 justify-center">
      {photoElements}
    </div>
  );
}
