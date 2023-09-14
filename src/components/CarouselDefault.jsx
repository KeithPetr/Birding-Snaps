import { Carousel } from "@material-tailwind/react";
import Logo from "../assets/logo.jpg"
import Test from "../assets/test.jpg"
import Test2 from "../assets/test2.jpg"

export default function CarouselDefault() {
    return (
        <Carousel className="w-1/2 h-1/2 mt-6">
            <img 
            alt="birdingsnaps logo"
            src={Logo}
            className="h-full w-full object-cover"
            />
            <img 
            alt="birdingsnaps logo"
            src={Test}
            className="h-full w-full object-cover"
            />
            <img 
            alt="birdingsnaps logo"
            src={Test2}
            className="h-full w-full object-cover"
            />
        </Carousel>
    )
}