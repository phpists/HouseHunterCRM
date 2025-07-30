import { useState } from "react";
import { PhotoSlider } from "react-photo-view";
import styled from "styled-components";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import noPhoto from "../../assets/images/no-photo.webp";
import { NewTag } from "../../pages/Client/Object/Maininfo/Slider/NewTag";
import Heart from "../../assets/images/red-heart.svg";
import EmptyHeart from "../../assets/images/empty-heart.svg";
import Star from "../../assets/images/star.svg";

export const Photo = ({ photos, data, onToggleFavoriteStatus }) => {
  const [openView, setOpenView] = useState(false);

  return (
    <>
      <div
        className="relative md:w-[230px] flex justify-center"
        onClick={() => setOpenView(true)}
      >
        <LazyLoadComponent>
          <div
            className={`absolute top-[6px] left-[6px] flex items-center gap-1`}
          >
            <NewTag />
          </div>

          <div className="text-xs stats absolute left-0 bottom-[40px] z-10">
            {data.data_level !== "0" && (
              <div className="bg-green-400 items-center flex gap-2 pl-2 pr-1 py-0.5">
                <span>TOP</span>
              </div>
            )}
          </div>

          <div className="text-xs stats absolute left-0 bottom-[10px] z-10">
            <div
              className={`${+data.index_overbuying >= 8 && "bg-red-400"} ${
                +data.index_overbuying >= 6 && "bg-orange-400"
              } ${
                +data.index_overbuying <= 5 && "bg-gray-400"
              }  items-center flex gap-2 pl-2 pr-1 py-0.5`}
            >
              <img src={Star} alt="" />
              <span>{data.index_overbuying}/10</span>
            </div>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavoriteStatus();
            }}
            className="cursor-pointer bg-white w-7 h-7 flex items-center justify-center rounded absolute right-[5px] bottom-[10px] z-10"
          >
            {data?.favorite ? (
              <img className="w-4 h-4" src={Heart} alt="" />
            ) : (
              <img className="w-4 h-4" src={EmptyHeart} alt="" />
            )}
          </div>

          <StyledPhoto
            src={photos?.[0] ?? noPhoto}
            alt="Vehicle preview"
            loading="lazy"
            className={`md:max-w-[230px] previewImage ${
              !photos?.[0] && "empty"
            }`}
          />
        </LazyLoadComponent>
      </div>
      {openView && (
        <PhotoSlider
          images={photos?.map((p) => ({ src: p, key: p }))}
          visible={openView}
          onClose={() => setOpenView(false)}
          speed={() => 0}
          easing={(type) =>
            type === 2
              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
        />
      )}
    </>
  );
};

const StyledPhoto = styled.img`
  border-radius: 5px !important;
  height: 170px !important;
  object-fit: contain;
  background: var(--main-bg);
  &.empty {
    object-fit: cover;
  }
  @media (max-width: 768px) {
    width: 100%;
    object-fit: cover;
  }
`;
