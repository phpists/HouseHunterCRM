import { styled } from "styled-components";
import { Photo } from "./Photo";
import { AddButton } from "./AddButton";
import { useLazyDeleteClientPhotoQuery } from "../../../../store/clients/clients.api";
import { useParams } from "react-router-dom";

export const OtherInfo = ({ photo, onChange, onRefreshClientData }) => {
  const { id } = useParams();
  const [deletePhoto] = useLazyDeleteClientPhotoQuery();

  const handleAddPhoto = (file) => onChange(file);

  const handleDeletePhoto = () => {
    deletePhoto(id).then(() => onRefreshClientData());
  };

  return (
    <StyledOtherInfo className="flex items-center hide-scroll">
      {photo ? (
        <Photo
          photo={photo?.type ? URL.createObjectURL(photo) : photo}
          onRemove={() => (photo?.type ? onChange(null) : handleDeletePhoto())}
        />
      ) : null}
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
