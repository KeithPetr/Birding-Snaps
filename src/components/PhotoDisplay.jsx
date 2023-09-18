import Grosbeak from "../assets/grosbeak.jpg";
import Warbler from "../assets/yellow-rumped-warbler.jpg";
import Veery from "../assets/veery.jpg";
import Blackbird from "../photos/Blackbird.jpg";
import Bluebird from "../photos/Bluebird.jpg";
import Cowbird from "../photos/Cowbird.jpg";
import WinterWren from "../photos/WinterWren.jpg";
import YellowWarbler from "../photos/YellowWarbler.jpg";

export default function PhotoDisplay() {
        const photos = [Grosbeak, Warbler, Veery, Blackbird, Bluebird, Cowbird, WinterWren, YellowWarbler]
        const photoElements = photos.map((photo, index) => {
            return (
                <img key={index} src={photo} className="h-24 w-24"/>
            )
        })

        return (
            <div className="flex flex-wrap gap-x-2 gap-y-2 pb-4 justify-center">
                {photoElements}
            </div>
        )
    }