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
    variableWidth: false,
    adaptiveHeight: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1282,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 985,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 704,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slider className="slider" {...settings}>
      {children}
    </Slider>
  );
};
