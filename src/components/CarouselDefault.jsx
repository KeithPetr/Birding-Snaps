/* eslint-disable react/prop-types */
import { Carousel } from "@material-tailwind/react";
import Grosbeak from "../assets/grosbeak.jpg";
import Warbler from "../assets/yellow-rumped-warbler.jpg";
import Veery from "../assets/veery.jpg";
import Blackbird from "../photos/Blackbird.jpg";
import Bluebird from "../photos/Bluebird.jpg";
import Cowbird from "../photos/Cowbird.jpg";
import WinterWren from "../photos/WinterWren.jpg";
import YellowWarbler from "../photos/YellowWarbler.jpg";


export default function CarouselDefault({enter}) {
  const landingImages = [Grosbeak, Warbler, Veery]
  const todaysImages = [Bluebird, Blackbird, Cowbird, WinterWren, YellowWarbler]
  const EmptyComponent = () => null;
  const display = enter ? todaysImages : landingImages
  console.log("display", display)

  return (
    <Carousel
      transition={{ duration: 1 }}
      autoplay={true}
      autoplayDelay={3000}
      loop={true}
      prevArrow={() => <EmptyComponent />} // Hide previous arrow
      nextArrow={() => <EmptyComponent />} // Hide next arrow
    >
      {display.map((image, index) => {
        return (
          <img
            key={index}
            alt="birdingsnaps logo"
            src={image}
            className="h-full w-full object-cover"
          />
        );
      })}
    </Carousel>
  );
}
