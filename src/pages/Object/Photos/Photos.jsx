import { styled } from "styled-components";
import { MainPhoto } from "./MainPhoto/MainPhoto";
import { AddPhoto } from "./AddPhoto";
import { useState } from "react";
import photo from "../../../assets/images/object.png";
import { Photo } from "./Photo";

export const Photos = () => {
  const [photos, setPhotos] = useState([photo]);

  console.log(photos.length !== 2);
  return (
    <StyledPhotos photosCount={photos.length}>
      <MainPhoto photo={photos[0]} photosCount={photos.length} />
      {photos.length > 1 && (
        <div className="photos hide-scroll">
          {photos.slice(1, photos.length).map((p, i) => (
            <Photo key={i} photo={p} />
          ))}
          {photos.length === 2 && (
            <AddPhoto small onAdd={() => setPhotos([...photos, photo])} />
          )}
        </div>
      )}
      {photos.length !== 2 && (
        <AddPhoto onAdd={() => setPhotos([...photos, photo])} />
      )}
    </StyledPhotos>
  );
};

const StyledPhotos = styled.div`
  .photos {
    display: grid;
    grid-template-columns: 193px 193px;
    gap: 15px;
    ${({ photosCount }) => photosCount > 2 && "margin-bottom: 10px;"}
    height: 193px;
    overflow: auto;
  }
`;
