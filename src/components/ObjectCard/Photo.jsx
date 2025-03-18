import { useEffect, useRef, useState } from "react";
import { PhotoSlider } from "react-photo-view";
import styled from "styled-components";
import ReactImageMagnify from "react-image-magnify";

export const Photo = ({ photos }) => {
  const [openView, setOpenView] = useState(false);
  const photoRef = useRef();

  return (
    <>
      <StyledPhoto
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: photos?.[0],
          },
          largeImage: {
            src: photos?.[0],
            width: 1400,
            height: 1800,
          },
        }}
        onClick={() => setOpenView(true)}
        enlargedImageContainerClassName="previewContainer"
        imageClassName="previewImage"
      />
      {/* <StyledPhoto
        style={{ background: `url(${photos?.[0]}) center/cover no-repeat` }}
        onClick={() => setOpenView(true)}
        ref={photoRef}
      /> */}
      {openView && (
        <PhotoSlider
          images={photos?.map((p) => ({ src: p, key: p }))}
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
    </>
  );
};

const StyledPhoto = styled(ReactImageMagnify)`
  .previewImage {
    min-height: 130px !important;
    width: 170px !important;
    border-radius: 5px !important;
    height: 170px !important;
    object-fit: cover;
  }
  img {
    max-width: unset !important;
  }
  .previewContainer {
    width: 170px !important;
    height: 170px !important;
    border-radius: 5px !important;
    z-index: 1000 !important;
    background: var(--main-bg);
    img {
      object-fit: cover;
    }
  }
`;
