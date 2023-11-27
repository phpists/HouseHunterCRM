import { styled } from "styled-components";
import { Photo } from "./Photo";
import { AddButton } from "./AddButton";
import { useLazyDeleteClientPhotoQuery } from "../../../../store/clients/clients.api";
import { useParams } from "react-router-dom";
import { handleResponse } from "../../../../utilits";
import { PhotoSlider } from "react-photo-view";
import { useState } from "react";

export const OtherInfo = ({ photos, onChange, onRefreshClientData }) => {
  const { id } = useParams();
  const [deletePhoto] = useLazyDeleteClientPhotoQuery();
  const [openView, setOpenView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleAddPhoto = (files) => onChange([...photos, ...files]);

  const handleDeletePhoto = (id_img, index) => {
    deletePhoto({ id_client: id, id_img }).then((resp) =>
      handleResponse(resp, () => {
        onChange(photos.filter((p, i) => p?.id?.toString() !== id_img));
      })
    );
  };

  const handleOpenSlider = (index) => {
    setOpenView(true);
    setCurrentSlide(index);
  };

  return (
    <StyledOtherInfo className="flex items-center">
      <PhotoSlider
        images={photos.map((photo) => ({
          src: photo?.type ? URL.createObjectURL(photo) : photo?.name,
          key: photo?.type ? URL.createObjectURL(photo) : photo?.name,
        }))}
        visible={openView}
        onClose={() => setOpenView(false)}
        index={currentSlide}
        onIndexChange={(index) => setCurrentSlide(index)}
      />
      {photos?.length > 0
        ? photos?.map((photo, i) => (
            <Photo
              key={i}
              photo={photo?.type ? URL.createObjectURL(photo) : photo?.name}
              onRemove={() =>
                photo?.type
                  ? onChange(photos.filter((p, j) => j !== i))
                  : handleDeletePhoto(photo?.id?.toString(), i)
              }
              onShow={() => handleOpenSlider(i)}
            />
          ))
        : null}
      <AddButton onAdd={handleAddPhoto} />
    </StyledOtherInfo>
  );
};

const StyledOtherInfo = styled.div`
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.2);
  padding: 3px;
  overflow: auto;
  position: relative;
  z-index: 20;
  max-width: 370px;
  &::-webkit-scrollbar {
    height: 10px;
  }
`;
