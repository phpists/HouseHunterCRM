import { useState } from "react";
import { PhotoSlider } from "react-photo-view";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import noPhoto from "../../assets/images/no-photo.webp";

export const Photo = ({ photos }) => {
  const [openView, setOpenView] = useState(false);

  return (
    <>
      <div className="w-[230px] flex justify-center">
        <div onClick={() => setOpenView(true)}>
          <StyledPhoto
            className={`previewImage ${!photos?.[0] && "empty"}`}
            src={photos?.[0] ?? noPhoto}
            alt="Vehicle preview"
            effect="blur"
            placeholderSrc={noPhoto}
            style={{ backgroundSize: photos?.[0] ? "contain" : "cover" }}
            loading="lazy"
          />
        </div>
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

const StyledPhoto = styled(LazyLoadImage)`
  border-radius: 5px !important;
  height: 170px !important;
  object-fit: contain;
  background: var(--main-bg);
  &.empty {
    object-fit: cover;
  }
  width: 100%;
`;
