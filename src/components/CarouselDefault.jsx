/* eslint-disable react/prop-types */
import { Carousel } from "@material-tailwind/react";
import Logo from "../assets/logo.jpg";
import Test from "../assets/test.jpg";
import Test2 from "../assets/test2.jpg";

export default function CarouselDefault() {
  const imageUrls = [Logo, Test, Test2];

  return (
    <Carousel
      className="w-1/2 h-1/2 mt-6 z-10"
      transition={{ duration: 1 }}
      autoplay={true}
      autoplayDelay={4000}
      loop={true}
    >
      {imageUrls.map((imageUrl, index) => {
        console.log(index);
        return (
          <img
            key={index}
            alt="birdingsnaps logo"
            src={imageUrl}
            className="h-full w-full object-cover"
          />
        );
      })}
    </Carousel>
  );
}
