import { styled } from "styled-components";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import noPhoto from "../../../assets/images/no-photo.webp";
import { Slide } from "./Slide";
import { Photos } from "./Photos/Photos";
import { Arrows } from "./Arrows";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Tags } from "./Tags";
import prevIcon from "../../../assets/images/prev-arrow.svg";
import nextIcon from "../../../assets/images/next-arrow.svg";
import { Counter } from "../../../pages/Client/Object/Maininfo/Slider/Counter";
import { Status } from "./Status";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: false,
  touchMove: true,
};

export const Slider = ({ photos, data, showLike }) => {
  const sliderRef = useRef(null);
  const slickRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [openView, setOpenView] = useState(false);

  const handleChangeSlide = (val, open) => {
    setOpenView(!!open);
    setCurrentSlide(val);
  };

  useEffect(() => {
    slickRef.current && slickRef.current.slickGoTo(0);
  }, []);

  return (
    <>
      {openView && (
        <PhotoSlider
          images={photos
            .map(({ name }, key) => ({
              src: name,
              key: key + 1 === currentSlide ? 100 : 2,
            }))
            ?.sort((a, b) => b?.key - a?.key)}
          visible={openView}
          onClose={() => setOpenView(false)}
          // index={currentSlide - 1}
          // onIndexChange={(index) => handleChangeSlide(index, true)}
          speed={() => 0}
          easing={(type) =>
            type === 2
              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
        />
      )}
      <StyledSlider
        className="flex items-center"
        ref={sliderRef}
        empty={(photos?.length < 2).toString()}
      >
        <div className="relative slider">
          {showLike && <Status data={data} />}
          {photos?.length > 1 ? (
            <Counter current={currentSlide} total={photos.length} />
          ) : null}
          <Tags data={data} />
          {photos?.length === 0 ? (
            <Slide photo={noPhoto} active empty onOpen={() => null} />
          ) : (
            <SlickSlider
              {...settings}
              beforeChange={(currentSlide, nextSlide) =>
                setCurrentSlide(1 + nextSlide)
              }
              //   currentSlide={currentSlide}
              prevArrow={
                <button>
                  <img src={prevIcon} alt="" />
                </button>
              }
              nextArrow={
                <button>
                  <img src={nextIcon} alt="" />
                </button>
              }
              ref={slickRef}
            >
              {photos
                ?.map(({ name }) => name)
                .map((photo, i) => (
                  <Slide
                    key={i}
                    photo={photo}
                    active={true}
                    empty={photos?.length === 1}
                    onOpen={() => setOpenView(true)}
                  />
                ))}
            </SlickSlider>
          )}
        </div>
      </StyledSlider>
    </>
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
  .slick-next,
  .slick-prev {
    width: 30px;
    height: 30px;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .slick-next {
    right: 8px;
    z-index: 4;
  }
  .slick-prev {
    left: 8px;
    z-index: 4;
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
      width: calc(100svw - -4px - 8px - 44px - 24px - 39px);
    }
  }

  @media (min-width: 1400px) {
    .slider {
      width: 252px;
    }
  }
`;
