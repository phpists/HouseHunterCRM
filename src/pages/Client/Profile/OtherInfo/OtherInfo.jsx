import { styled } from "styled-components";
import { Photo } from "./Photo";
import { AddButton } from "./AddButton";

export const OtherInfo = ({ photo, onChange }) => {
  const handleAddPhoto = (file) => onChange(file);

  return (
    <StyledOtherInfo className="flex items-center hide-scroll">
      {photo ? (
        <Photo
          photo={photo?.type ? URL.createObjectURL(photo) : photo}
          onRemove={() => onChange(null)}
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
