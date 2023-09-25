import { ReactNode } from "react";
import Slider from "react-slick";

interface ICarousel {
  children: ReactNode;
}

export const Carousel = ({ children }: ICarousel) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    centerMode: false,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
