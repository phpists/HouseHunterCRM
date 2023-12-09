import styled from "styled-components";
import addAvatar from "../../../../assets/images/add-avatar.svg";
import remove from "../../../../assets/images/remove.svg";
import { useRef } from "react";
import { handleGetRoleAvatar } from "../../../../utilits";

export const Avatar = ({
  photo,
  onChangeField,
  onRemoveAvatar,
  data,
  level,
}) => {
  const inputRef = useRef(null);

  const handleAddPhoto = (file) =>
    onChangeField("photo", { file, url: URL.createObjectURL(file) });
  const handleDeletePhoto = () => {
    // deletePhoto(id).then(() => onRefreshData());
  };

  return (
    <StyledAvatarWrapper>
      <StyledAvatar
        avatar={photo?.length > 0 ? photo : handleGetRoleAvatar(level)}
        isRemove={photo && onRemoveAvatar}
      >
        {photo && onRemoveAvatar && (
          <img
            onClick={onRemoveAvatar}
            src={remove}
            alt="remove avatar"
            className="remove-btn"
          />
        )}
        <input
          type="file"
          name=""
          id=""
          accept="image/png, image/jpg, image/jpeg"
          value=""
          onChange={(e) => handleAddPhoto(e.target.files[0])}
          ref={inputRef}
        />
      </StyledAvatar>
      <img
        src={addAvatar}
        alt=""
        className="add-btn"
        onClick={() => inputRef.current.click()}
      />
    </StyledAvatarWrapper>
  );
};

const StyledAvatarWrapper = styled.div`
  position: relative;
  .add-btn {
    position: absolute;
    bottom: 0;
    right: 8px;
    cursor: pointer;
    z-index: 10;
  }
`;
const StyledAvatar = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 100%;
  position: relative;
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
  margin-right: 16px;
  cursor: pointer;
  z-index: 10;
  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    z-index: -100;
  }
  .remove-btn {
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    ${({ isRemove }) =>
      isRemove &&
      `
        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: absolute;
            border-radius: 100%;
            cursor: pointer;
        }
        .remove-btn {
            visibility: visible;
            cursor: pointer;
        }
    `}
  }
`;
