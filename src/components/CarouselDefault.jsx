/* eslint-disable react/prop-types */
import { Carousel } from "@material-tailwind/react";
import Blackbird from "../photos/Blackbird.jpg";
import Bluebird from "../photos/Bluebird.jpg";
import Cowbird from "../photos/Cowbird.jpg";
import WinterWren from "../photos/WinterWren.jpg";
import YellowWarbler from "../photos/YellowWarbler.jpg";


export default function CarouselDefault() {
  const todaysImages = [Bluebird, Blackbird, Cowbird, WinterWren, YellowWarbler]

  return (
    <Carousel
      transition={{ duration: 1 }}
      autoplay={true}
      autoplayDelay={3000}
      loop={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-10 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {todaysImages.map((image, index) => {
        return (
          <img
            key={index}
            alt="birdingsnaps logo"
            src={image}
            className="h-full w-full"
          />
        );
      })}
    </Carousel>
  );
}
