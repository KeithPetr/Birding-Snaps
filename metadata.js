import { getStorage, ref, getMetadata, updateMetadata } from "firebase/storage";
import app from "./firebase.config.js";
import { nanoid } from 'nanoid';

const storage = getStorage(app);
const fileRef = ref(storage, "images/Bluebird.jpg");

// Define a function to retrieve metadata
async function retrieveMetadata() {
  try {
    // Retrieve the existing metadata
    const metadata = await getMetadata(fileRef);
    console.log("Existing Metadata:", metadata);
    metadata.name = "Eastern Bluebird"
    metadata.id = nanoid()
    console.log("Modified Metadata:", metadata);
    return updateMetadata(fileRef, metadata);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error; // You can choose to rethrow the error or handle it as needed
  }
}

// Export the function for use in other modules
export default retrieveMetadata;