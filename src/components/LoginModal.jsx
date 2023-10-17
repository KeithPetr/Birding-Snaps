import { useContext } from "react";
import { BirdContext } from "../BirdContext";
import { Button } from "@material-tailwind/react";
import { auth } from "../../firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginModal() {
  const value = useContext(BirdContext);
  const { setShowLoginModal } = value;

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        // Close the modal
        setShowLoginModal(false);
      })
      .catch((error) => {
        // Handle login errors if needed
        console.error("Error signing in with Google: ", error);
      });
  }

  function closeModal() {
    setShowLoginModal(false);
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900 opacity-50 z-20"
        onClick={() => setShowLoginModal(false)}
      ></div>
      <div
        className="flex flex-col items-center w-11/12 h-48 z-30 
      bg-white absolute top-[50%] left-[50%] transform -translate-x-1/2 
      -translate-y-1/2 max-w-[400px]"
      >
        <div className="relative flex justify-center w-full h-full">
          <div
            className="text-red-900 cursor-pointer font-extrabold text-2xl top-0 right-2 absolute"
            onClick={closeModal}
          >
            X
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1>Sign In With</h1>
            <Button
              className="bg-blue-300 text-gray-50 border-2 border-blue-100 cursor-pointer mt-2"
              onClick={googleSignIn}
            >
              Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
