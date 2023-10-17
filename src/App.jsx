/* eslint-disable react/prop-types */
import Home from "./components/Home";
import Mountains from "./photos/mountains.jpg";

export default function App() {
  const bodyStyles = {
    backgroundImage: `url(${Mountains})`,
    backgroundSize: 'cover',
  };

  return (
    <div style={bodyStyles}>
      <Home />
    </div>
  );
}
