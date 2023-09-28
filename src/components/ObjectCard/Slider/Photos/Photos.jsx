import { styled } from "styled-components";
import { Photo } from "./Photo";

export const Photos = ({ photos }) => (
  <StyledPhotos className="hide-scroll">
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
  height: 200px;
  overflow: auto;
  @media (min-width: 800px) {
    display: flex;
    width: 200px;
    height: max-content;
    margin: 8px 0 0 0;
  }
`;
