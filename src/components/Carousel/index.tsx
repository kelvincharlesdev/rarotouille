import { ReactNode } from "react";
import Slider from "react-slick";
import "./styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
interface ICarousel {
  children: ReactNode;
}

export const Carousel = ({ children }: ICarousel) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    centerMode: false,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <Slider className="slider" {...settings}>
      {children}
    </Slider>
  );
};
