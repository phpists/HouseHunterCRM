import { styled } from "styled-components";
import { MainPhoto } from "./MainPhoto/MainPhoto";
import { AddPhoto } from "./AddPhoto";
import { Photo } from "./Photo/Photo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useLazyDeleteObjectPhotoQuery,
  useLazyRotateImageQuery,
  useLazySetCoverPhotoQuery,
} from "../../../store/objects/objects.api";
import { handleResponse, showAlert } from "../../../utilits";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export const Photos = ({ photos, onChange, onRefresh }) => {
  const { id } = useParams();
  const [setCoverPhoto] = useLazySetCoverPhotoQuery();
  const [deletePhoto] = useLazyDeleteObjectPhotoQuery();
  const [rotateImage] = useLazyRotateImageQuery();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [openView, setOpenView] = useState(false);

  const handleDelete = (id_img) => {
    deletePhoto({ id_object: id, id_img }).then((resp) =>
      handleResponse(resp, () => {
        onChange(photos.filter((p) => p?.id !== id_img));
        showAlert("success", "Фото успішно видалено");
      })
    );
  };

  const handleDeletePhoto = (index, photo) => {
    photo?.file
      ? onChange(photos.filter((p, j) => 1 + index !== j))
      : handleDelete(photo?.id);
  };

  const handleRotate = (photoId, rotate) => {
    rotateImage({
      id_object: id,
      id_img: photoId,
      rotate,
    }).then((resp) => {
      handleResponse(resp, () => {
        onRefresh();
        showAlert("success", "Фото успішно перевернуто");
      });
    });
  };

  const handleSetPhotoCover = (index, photo) => {
    if (id) {
      setCoverPhoto({ id_object: id, id_img: photo?.id }).then((resp) =>
        handleResponse(resp, () => {
          const filteredPhotos = photos.filter((p, i) => i !== index);
          onChange([
            { ...photo, cover: 1 },
            ...filteredPhotos?.map((p) => ({ ...p, cover: 0 })),
          ]);
        })
      );
    } else {
      const filteredPhotos = photos.filter((p, i) => i !== index);
      onChange([
        { ...photo, cover: 1 },
        ...filteredPhotos?.map((p) => ({ ...p, cover: 0 })),
      ]);
    }
  };

  const handleOpenPhoto = (index) => {
    setOpenView(true);
    setCurrentSlide(index);
  };

  return (
    <>
      {openView && (
        <PhotoSlider
          images={photos
            .map(({ url }, key) => ({
              src: url,
              key: key + 1 === currentSlide ? 100 : 2,
            }))
            ?.sort((a, b) => b?.key - a?.key)}
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
      <StyledPhotos photosCount={photos.length}>
        <MainPhoto
          photo={photos[0]}
          photosCount={photos.length === 0 ? 1 : photos.length}
          onRemove={() => handleDeletePhoto(0, photos[0])}
          isPhoto={!!photos[0]}
          isCover={photos[0]?.cover ?? 0}
          onMakeMain={() => handleSetPhotoCover(0, photos[0])}
          onOpen={() => handleOpenPhoto(0)}
          onRotate={
            photos[0]?.file ? null : () => handleRotate(photos[0]?.id, "90")
          }
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
                    onMakeMain={() => handleSetPhotoCover(1 + i, p)}
                    isFile={!!p?.file}
                    onOpen={() => handleOpenPhoto(2 + i)}
                    onRotate={() => handleRotate(p?.id, "90")}
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
              <div className="photos photos-more ">
                {/* <DraggableList width={207} height={211} rowSize={2}> */}
                {photos.slice(1, photos.length).map((p, i) => (
                  <Photo
                    key={i}
                    photo={p}
                    onRemove={() => handleDeletePhoto(i, p)}
                    onMakeMain={() => handleSetPhotoCover(1 + i, p)}
                    isFile={!!p?.file}
                    onOpen={() => handleOpenPhoto(2 + i)}
                    onRotate={() => handleRotate(p?.id, "90")}
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
    </>
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
    overflow-x: hidden;
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
