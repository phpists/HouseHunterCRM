import { useEffect, useRef, useState } from "react";
import { PhotoSlider } from "react-photo-view";
import styled from "styled-components";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactImageMagnify from "react-image-magnify";
import noPhoto from "../../assets/images/no-photo.webp";

export const Photo = ({ photos }) => {
  const [openView, setOpenView] = useState(false);
  const photoRef = useRef();

  return (
    <>
      <div
        className="w-[230px] flex justify-center"
        onClick={() => setOpenView(true)}
      >
        <LazyLoadComponent>
          <StyledPhoto
            {...{
              smallImage: {
                isFluidWidth: true,
                src: photos?.[0] ?? noPhoto,
                alt: "Vehicle preview",
                loading: "lazy", // Native lazy loading for compatibility
              },
              largeImage: {
                src: photos?.[0] ?? noPhoto,
                width: 1200,
                height: 1800,
              },
            }}
            enlargedImageContainerClassName="previewContainer"
            imageClassName={`previewImage ${!photos?.[0] && "empty"}`}
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

const StyledPhoto = styled(ReactImageMagnify)`
  .previewImage {
    border-radius: 5px !important;
    height: 170px !important;
    object-fit: contain;
    background: var(--main-bg);
    &.empty {
      object-fit: cover;
    }
  }
  img {
    max-width: unset !important;
  }
  .previewContainer {
    // width: auto !important;
    // height: auto !important;
    border-radius: 5px !important;
    z-index: 1000 !important;
    background: var(--main-bg);
    img {
      // object-fit: scale-down;
    }
  }
`;
