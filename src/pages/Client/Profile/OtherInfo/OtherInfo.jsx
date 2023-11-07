import { styled } from "styled-components";
import { Photo } from "./Photo";
import { AddButton } from "./AddButton";
import { useLazyDeleteClientPhotoQuery } from "../../../../store/clients/clients.api";
import { useParams } from "react-router-dom";

export const OtherInfo = ({ photos, onChange, onRefreshClientData }) => {
  const { id } = useParams();
  const [deletePhoto] = useLazyDeleteClientPhotoQuery();

  const handleAddPhoto = (files) => onChange([...photos, ...files]);

  const handleDeletePhoto = (id_img) => {
    deletePhoto({ id_client: id, id_img }).then(() => onRefreshClientData());
  };

  return (
    <StyledOtherInfo className="flex items-center hide-scroll">
      {photos?.length > 0
        ? photos?.map((photo, i) => (
            <Photo
              key={i}
              photo={photo?.type ? URL.createObjectURL(photo) : photo?.name}
              onRemove={() =>
                photo?.type
                  ? onChange(photos.filter((p, j) => j !== i))
                  : handleDeletePhoto(photo?.id?.toString())
              }
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
`;
