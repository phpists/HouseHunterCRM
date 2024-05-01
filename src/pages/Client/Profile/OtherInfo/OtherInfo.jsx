import { styled } from "styled-components";
import { Photo } from "./Photo";
import { AddButton } from "./AddButton";
import { useLazyDeleteClientPhotoQuery } from "../../../../store/clients/clients.api";
import { useParams } from "react-router-dom";
import { handleResponse } from "../../../../utilits";
import { PhotoSlider } from "react-photo-view";
import { useState } from "react";
import { Confirm } from "../../../../components/Confirm/Confirm";

export const OtherInfo = ({
  photos,
  onChange,
  onRefreshClientData,
  readOnly,
}) => {
  const { id } = useParams();
  const [deletePhoto] = useLazyDeleteClientPhotoQuery();
  const [openView, setOpenView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [removeConfirm, setRemoveConfirm] = useState(null);
  const [onConfirmRemove, setOnRemoveConfirm] = useState(null);

  const handleAddPhoto = (files) => {
    const formatedFiles = [];

    for (let i = 0; i < files?.length; i++) {
      formatedFiles.push({
        file: files[i],
        name: URL.createObjectURL(files[i]),
      });
    }
    onChange([...photos, ...formatedFiles]);
  };

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
      {removeConfirm && (
        <Confirm
          title={"Видалити фото?"}
          onClose={() => setRemoveConfirm(false)}
          onSubmit={() => (onConfirmRemove ? onConfirmRemove() : null)}
        />
      )}
      <PhotoSlider
        images={photos.map((photo) => ({
          src: photo?.name,
          key: photo?.name,
        }))}
        visible={openView}
        onClose={() => setOpenView(false)}
        index={currentSlide}
        onIndexChange={(index) => setCurrentSlide(index)}
        speed={() => 0}
        easing={(type) =>
          type === 2
            ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
            : "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      />
      {!readOnly && <AddButton onAdd={handleAddPhoto} />}
      {photos?.length > 0
        ? photos?.map((photo, i) => (
            <Photo
              key={i}
              photo={photo?.name}
              onRemove={() => {
                setRemoveConfirm(true);
                setOnRemoveConfirm(() =>
                  photo?.file
                    ? () => onChange(photos.filter((p, j) => j !== i))
                    : () => handleDeletePhoto(photo?.id?.toString(), i)
                );
              }}
              onShow={() => handleOpenSlider(i)}
              readOnly={readOnly}
            />
          ))
        : null}
    </StyledOtherInfo>
  );
};

const StyledOtherInfo = styled.div`
  border-radius: 9px;
  background: var(--bg-20);
  padding: 3px;
  overflow: auto;
  position: relative;
  z-index: 20;
  max-width: 370px;
  &::-webkit-scrollbar {
    height: 10px;
  }
`;
