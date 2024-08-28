import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Photo } from "@/types";
type Props = {
  photos: any;
};

const PhotoCarousel = ({ photos }: Props) => {
  console.log(photos);
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      autoplay={true}
      autoplayInterval={5000}
    >
      <CarouselContent className="h-full">
        {photos?.map((photo: Photo) => (
          <CarouselItem key={photo._id} className="rounded-md h-[400px] w-full">
            <img
              src={photo.photoUrl}
              alt=""
              className="rounded-l-md w-full h-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PhotoCarousel;
