import { useEffect, useRef, useState, useContext } from "react";
import { BirdContext } from "../BirdContext";
import { Button } from "@material-tailwind/react";

export default function ImageFilter() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [initialFilters, setInitialFilters] = useState({
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    saturation: 100,
  });
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const value = useContext(BirdContext);
  const { imageFavorites } = value;
  const src = imageFavorites[1];

  useEffect(() => {
    loadImage(src);
  }, [src]);

  useEffect(() => {
    if (imageLoaded) {
      drawImage();
    }
  }, [brightness, contrast, grayscale, saturation]);

  const loadImage = (src) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImageLoaded(true);
      imageRef.current = image;
    };
  };

  const drawImage = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.filter = `saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`;
    ctx.drawImage(
      imageRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    console.log(`New ${name} value: ${value}`);
    switch (name) {
      case "brightness":
        setBrightness(value);
        break;
      case "contrast":
        setContrast(value);
        break;
      case "grayscale":
        setGrayscale(value);
        break;
      case "saturation":
        setSaturation(value);
        break;
      default:
        break;
    }
  };

  function resetFilters() {
    // Store the current filter settings in initialFilters
    setInitialFilters({
      brightness,
      contrast,
      grayscale,
      saturation,
    });

    // Reset the filters to their original values
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setSaturation(100);
  }

  function handleCanvasMouseDown() {
    resetFilters();
  }

  function handleCanvasMouseUp() {
    // Restore the filters to their previous values from initialFilters
    setBrightness(initialFilters.brightness);
    setContrast(initialFilters.contrast);
    setGrayscale(initialFilters.grayscale);
    setSaturation(initialFilters.saturation);
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="200"
        height="200"
        onMouseDown={handleCanvasMouseDown}
        onMouseUp={handleCanvasMouseUp}
      ></canvas>

      <img
        src={src}
        alt="Original"
        style={{ display: "none" }}
        ref={imageRef}
        onLoad={drawImage}
      />

      {imageLoaded && (
        <div>
          <label>
            Brightness:
            <input
              type="range"
              name="brightness"
              min="0"
              max="200"
              value={brightness}
              onChange={handleFilterChange}
            />
            {brightness}%
          </label>
          <br />
          <label>
            Contrast:
            <input
              type="range"
              name="contrast"
              min="0"
              max="200"
              value={contrast}
              onChange={handleFilterChange}
            />
            {contrast}%
          </label>
          <br />
          <label>
            Grayscale:
            <input
              type="range"
              name="grayscale"
              min="0"
              max="100"
              value={grayscale}
              onChange={handleFilterChange}
            />
            {grayscale}%
          </label>
          <br />
          <label>
            Saturation:
            <input
              type="range"
              name="saturation"
              min="0"
              max="200"
              value={saturation}
              onChange={handleFilterChange}
            />
            {saturation}%
          </label>
        </div>
      )}
      <Button
        className="bg-blue-300 text-gray-50 border-2 border-blue-100 w-11/12 p-2"
        onClick={resetFilters}
      >
        Reset
      </Button>
    </div>
  );
}
