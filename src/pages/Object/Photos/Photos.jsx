import { styled } from "styled-components";
import { MainPhoto } from "./MainPhoto/MainPhoto";
import { AddPhoto } from "./AddPhoto";
import { Photo } from "./Photo/Photo";
import noPhoto from "../../../assets/images/no-photo.svg";

export const Photos = ({ photos, onChange, onDeletePhoto, onCoverChange }) => {
  const handleDeletePhoto = (index, photo) => {
    photo?.type
      ? onChange(photos.filter((p, j) => 1 + index !== j))
      : onDeletePhoto(photo?.id);
  };

  return (
    <StyledPhotos photosCount={photos.length}>
      <MainPhoto
        photo={photos[0] ?? noPhoto}
        photosCount={photos.length === 0 ? 1 : photos.length}
        onRemove={() => handleDeletePhoto(0, photos[0])}
        isPhoto={!!photos[0]}
      />

      {photos.length > 1 && (
        <>
          {photos.length === 2 ? (
            <div className="photos photos-grid hide-scroll">
              {photos.slice(1, photos.length).map((p, i) => (
                <Photo
                  key={i}
                  photo={p}
                  onRemove={() => handleDeletePhoto(i, p)}
                  onMakeMain={() => onCoverChange(1 + i, p)}
                />
              ))}
              {photos.length === 2 && (
                <AddPhoto
                  small
                  onAdd={(files) => onChange([...photos, ...files])}
                />
              )}
            </div>
          ) : (
            <div className="photos photos-more hide-scroll">
              {/* <DraggableList width={207} height={211} rowSize={2}> */}
              {photos.slice(1, photos.length).map((p, i) => (
                <Photo
                  key={i}
                  photo={p}
                  onRemove={() => handleDeletePhoto(i, p)}
                  onMakeMain={() => onCoverChange(1 + i, p)}
                />
              ))}
              {/* </DraggableList> */}
              {photos.length === 2 && (
                <AddPhoto
                  small
                  onAdd={(files) => onChange([...photos, ...files])}
                />
              )}
            </div>
          )}
        </>
      )}

      {photos.length !== 2 && (
        <AddPhoto onAdd={(files) => onChange([...photos, ...files])} />
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

  .photos-more {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
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
      width: 100%;
      ${({ photosCount }) => photosCount === 2 && "height: 290px !important;"}
    }
    .photos-grid {
      grid-template-columns: 1fr;
      grid-auto-rows: max-content;
      .add-btn {
        width: 100% !important;
      }
    }
  }
`;
