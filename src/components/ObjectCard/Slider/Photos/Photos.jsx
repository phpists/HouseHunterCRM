import { styled } from "styled-components";
import { Photo } from "./Photo";

export const Photos = ({ photos, onSelect, active }) => {
  return (
    <StyledPhotos className="hide-scroll">
      {photos.map((photo, i) => (
        <Photo
          key={i}
          photo={photo}
          onSelect={() => onSelect(1 + i, true)}
          active={active === 1 + i}
        />
      ))}
    </StyledPhotos>
  );
};

const StyledPhotos = styled.div`
  margin-left: 8px;
  display: grid;
  grid-template-columns: 44px;
  gap: 6px;
  height: 200px;
  overflow: auto;
  grid-auto-rows: max-content;
  @media (max-width: 1399.9px) {
    display: flex;
    width: 200px;
    height: max-content;
    margin: 8px 0 0 0;
  }
  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: 44px;
    gap: 6px;
    height: 200px;
    overflow: auto;
    margin-left: 8px;
    width: 44px;
  }
`;
