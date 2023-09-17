/* eslint-disable react/prop-types */
import { Carousel } from "@material-tailwind/react";
import Grosbeak from "../assets/rose-breasted-grosbeak.jpg";
import Warbler from "../assets/yellow-rumped-warbler.jpg";
import Veery from "../assets/Veery.jpg";

export default function CarouselDefault() {
  const imageUrls = [Grosbeak, Warbler, Veery];
  const EmptyComponent = () => null;

  return (
    <Carousel
      transition={{ duration: 1 }}
      autoplay={true}
      autoplayDelay={3000}
      loop={true}
      prevArrow={() => <EmptyComponent />} // Hide previous arrow
      nextArrow={() => <EmptyComponent />} // Hide next arrow
    >
      {imageUrls.map((imageUrl, index) => {
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
