import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.config.js";

export default function PhotoDisplay() {
  const [imageUrls, setImageUrls] = useState([]);
  const storage = getStorage(app); // 'app' is the Firebase app instance you initialized

  // -------------- Delete File ----------------------------------
  // Create a reference to the file to delete
//   const desertRef = ref(storage, "todaysFavorites");
//   // Delete the file
//   deleteObject(desertRef)
//     .then(() => {
//       console.log("file deleted successfully");
//     })
//     .catch((error) => {
//       // Uh-oh, an error occurred!
//       console.error("Error occurred: ", error);
//     });
  // -------------------------------------------------------------

  useEffect(() => {
    // Initialize Firebase Storage

    // Create a reference to the storage bucket
    const storageRef = ref(storage, "images"); // "images" is the path to your images in Storage

    // List all items (images) in the storage bucket
    listAll(storageRef)
      .then((result) => {
        // Get the download URL for each image and store them in state
        console.log("result", result);
        const promises = result.items.map((item) => getDownloadURL(item));
        return Promise.all(promises);
      })
      .then((urls) => {
        // Set the image URLs in state
        console.log("urls", urls);
        setImageUrls(urls);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

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
