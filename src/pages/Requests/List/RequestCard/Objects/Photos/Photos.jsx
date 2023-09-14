import styled from "styled-components";
import photo1 from "../../../../../../assets/images/object-pic-1.png";
import photo2 from "../../../../../../assets/images/object-pic-2.png";
import photo3 from "../../../../../../assets/images/object-pic-3.png";
import photo4 from "../../../../../../assets/images/object-pic-4.png";
import { Photo } from "./Photo";

const photos = [photo1, photo2, photo3, photo4];

export const Photos = () => (
  <StyledPhotos className="clickable">
    {photos.map((photo, i) => (
      <Photo key={i} photo={photo} />
    ))}
  </StyledPhotos>
);

const StyledPhotos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 44px);
  gap: 8px;
  margin-right: 8px;
`;
