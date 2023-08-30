import { styled } from "styled-components";
import { Photo } from "./Photo";

export const Photos = ({ photos }) => (
  <StyledPhotos className="hide-scroll">
    {photos.map((photo, i) => (
      <Photo key={i} photo={photo} active={i === 0} />
    ))}
  </StyledPhotos>
);

const StyledPhotos = styled.div`
  margin-left: 6px;
  display: grid;
  grid-template-columns: 55px;
  gap: 6px;
  height: 220px;
  overflow: auto;
`;
