import { styled } from "styled-components";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import object1 from "../../../assets/images/object.png";
import object2 from "../../../assets/images/object2.png";
import { Slide } from "./Slide";
import { Photos } from "./Photos/Photos";
import { Arrows } from "./Arrows";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: false,
  touchMove: false,
};

const photos = [object1, object2, object1, object2, object2, object2];

export const Slider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <StyledSlider className="flex items-center" ref={sliderRef}>
      <div className="relative slider">
        <Arrows
          currentSlide={currentSlide}
          total={photos.length}
          onChangeSlide={(value) => setCurrentSlide(value)}
        />
        <SlickSlider
          {...settings}
          beforeChange={(currentSlide, nextSlide) =>
            setCurrentSlide(1 + nextSlide)
          }
          currentSlide={currentSlide}
          prevArrow={<></>}
          nextArrow={<></>}
        >
          {photos.map((photo, i) => (
            <Slide key={i} photo={photo} />
          ))}
        </SlickSlider>
      </div>
      <Photos photos={photos} />
    </StyledSlider>
  );
};

const StyledSlider = styled.div`
  position: relative;
  margin-right: 10px;
  height: 200px;
  /* height: 100%; */
  .slider {
    width: 200px;
    min-height: 200px;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
    flex-shrink: 0;
  }
  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-slide > div {
    height: 100%;
  }
  .slick-arrow {
    transition: all 0.3s;
    &::before {
      display: none;
    }
  }

  .slider-arrows {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  &:hover {
    .slider-arrows {
      opacity: 1;
      visibility: visible;
    }
  }
  @media (max-width: 1399.9px) {
    flex-direction: column;
    height: auto;
  }
  @media (max-width: 800px) {
    flex-direction: row;
    margin: 0;
    .slider {
      width: calc(100svw - 60px - 8px - 44px - 24px - 39px);
    }
  }
`;
