import { styled } from "styled-components";
import { Photo } from "./Photo";

export const Photos = ({ photos, sliderHeight }) => (
  <StyledPhotos className="hide-scroll" sliderHeight={sliderHeight}>
    {photos.map((photo, i) => (
      <Photo key={i} photo={photo} />
    ))}
  </StyledPhotos>
);

const StyledPhotos = styled.div`
  margin-left: 8px;
  display: grid;
  grid-template-columns: 44px;
  gap: 6px;
  height: ${({ sliderHeight }) => sliderHeight}px;
  overflow: auto;
`;
