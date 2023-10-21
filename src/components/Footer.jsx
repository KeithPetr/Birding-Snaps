import Instagram from "../photos/instagram-icon.png";

export default function Footer() {
  return (
    <div className="border-t py-2 bg-blue-500 flex justify-center">
      <a href="https://www.instagram.com/birdingsnaps" target="_blank" rel="noreferrer" className="flex items-center">
        <p className="md:text-xl text-gray-100 text-outline">Follow me on Instagram</p>
        <img className="ml-2 w-8 md:w-12" src={Instagram} />
      </a>
    </div>
  );
}
