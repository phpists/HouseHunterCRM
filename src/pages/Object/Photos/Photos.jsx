import { styled } from "styled-components";
import { MainPhoto } from "./MainPhoto/MainPhoto";
import { AddPhoto } from "./AddPhoto";
import { useState } from "react";
import photo from "../../../assets/images/object.png";
import { Photo } from "./Photo/Photo";
import DraggableList from "react-draggable-lists";

export const Photos = () => {
  const [photos, setPhotos] = useState([photo]);
  return (
    <StyledPhotos photosCount={photos.length}>
      <MainPhoto photo={photos[0]} photosCount={photos.length} />

      {photos.length > 1 && (
        <>
          {photos.length === 2 ? (
            <div className="photos photos-grid hide-scroll">
              {photos.slice(1, photos.length).map((p, i) => (
                <Photo
                  key={i}
                  photo={p}
                  onRemove={() => setPhotos(photos.filter((p, j) => i !== j))}
                />
              ))}
              {photos.length === 2 && (
                <AddPhoto small onAdd={() => setPhotos([...photos, photo])} />
              )}
            </div>
          ) : (
            <div className="photos hide-scroll">
              <DraggableList width={207} height={211} rowSize={2}>
                {photos.slice(1, photos.length).map((p, i) => (
                  <Photo
                    key={i}
                    photo={p}
                    onRemove={() => setPhotos(photos.filter((p, j) => i !== j))}
                  />
                ))}
              </DraggableList>
              {photos.length === 2 && (
                <AddPhoto small onAdd={() => setPhotos([...photos, photo])} />
              )}
            </div>
          )}
        </>
      )}

      {photos.length !== 2 && (
        <AddPhoto onAdd={() => setPhotos([...photos, photo])} />
      )}
    </StyledPhotos>
  );
};

const StyledPhotos = styled.div`
  .photos-grid {
    display: grid;
    grid-template-columns: 193px 193px;
    grid-auto-rows: 193px;
  }
  .photos {
    gap: 15px;
    height: 193px;
    overflow: auto;
    width: 401px;
    margin: 0 auto;
    position: relative;
    ${({ photosCount }) => photosCount > 2 && "margin-bottom: 10px;"}
  }

  @media (max-width: 1500px) {
    .photos {
      width: 350px;
    }
    .photos-grid {
      grid-template-columns: 1fr 1fr;
      .add-btn {
        width: 180px !important;
      }
    }
  }
  @media (max-width: 1430px) {
    .photos {
      width: 330px;
    }
    .photos-grid {
      .add-btn {
        width: 150px !important;
      }
    }
  }

  @media (max-width: 1400px) {
    .photos {
      width: 280px;
    }
  }

  @media (max-width: 1300px) {
    .photos {
      width: 240px;
    }
    .photos-grid {
      grid-template-columns: 1fr;
      .add-btn {
        width: 100% !important;
      }
    }
  }
`;
