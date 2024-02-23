import { styled } from "styled-components";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import noPhoto from "../../../assets/images/no-photo.svg";
import { Slide } from "./Slide";
import { Photos } from "./Photos/Photos";
import { Arrows } from "./Arrows";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Tags } from "./Tags";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: false,
  touchMove: true,
};

export const Slider = ({ photos, data }) => {
  const sliderRef = useRef(null);
  const slickRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [openView, setOpenView] = useState(false);

  const handleChangeSlide = (val, open) => {
    slickRef.current.slickGoTo(val - 1);
    setOpenView(!!open);
  };

  useEffect(() => {
    slickRef.current.slickGoTo(0);
  }, []);

  //   obj_street_base
  //   mls
  return (
    <>
      <PhotoSlider
        images={photos.map(({ name }) => ({ src: name, key: name }))}
        visible={openView}
        onClose={() => setOpenView(false)}
        index={currentSlide - 1}
        onIndexChange={(index) => handleChangeSlide(index + 1, true)}
      />
      <StyledSlider
        className="flex items-center"
        ref={sliderRef}
        empty={photos?.length < 2}
      >
        <div className="relative slider">
          {photos?.length > 1 && (
            <Arrows
              currentSlide={currentSlide}
              total={photos.length}
              onChangeSlide={handleChangeSlide}
            />
          )}
          <Tags data={data} />
          <SlickSlider
            {...settings}
            beforeChange={(currentSlide, nextSlide) =>
              setCurrentSlide(1 + nextSlide)
            }
            currentSlide={currentSlide}
            prevArrow={<></>}
            nextArrow={<></>}
            ref={slickRef}
          >
            {photos?.length === 0 ? (
              <Slide photo={noPhoto} active empty onOpen={() => null} />
            ) : (
              photos
                ?.map(({ name }) => name)
                .map((photo, i) => (
                  <Slide
                    key={i}
                    photo={photo}
                    active={currentSlide === 1 + i}
                    empty={photos?.length === 1}
                    onOpen={() => setOpenView(true)}
                  />
                ))
            )}
          </SlickSlider>
        </div>
        {photos?.length > 1 ? (
          <Photos
            photos={photos?.map(({ name }, i) => name)}
            onSelect={handleChangeSlide}
            active={currentSlide}
          />
        ) : null}
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

  @media (min-width: 1400px) {
    .slider {
      ${({ empty }) => empty && "width: 252px;"}
    }
  }
`;
