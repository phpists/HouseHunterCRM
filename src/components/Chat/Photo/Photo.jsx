import { styled } from "styled-components";
import { Time } from "./Time";
import { Download } from "./Download";
import { Text } from "./Text";
import noPhoto from "../../../assets/images/no-photo.svg";
import { Response } from "../Response";
import { Tag } from "./Tag";
import { Spinner } from "../../Spinner";
import { getHours } from "../../../utilits";

export const Photo = ({
  photo,
  text,
  isOwner,
  date,
  onOpenObject,
  loading,
  isSelected,
  onSelect,
  id,
  isObject,
}) => {
  const handleOpen = (e) => {
    if (!e.target.classList.contains("image") || !onOpenObject) {
      onSelect();
    }
  };

  return (
    <StyledPhoto
      photo={photo ?? noPhoto}
      text={text}
      isOwner={isOwner}
      className={`${!!isObject && "cursor-pointer"}`}
      loading={loading}
      onClick={handleOpen}
      onTouchEnd={handleOpen}
      isSelected={isSelected}
      data-id={id}
    >
      {isObject && <Tag />}
      {loading && <Spinner className="loading-spinner" />}
      {photo && <Download photo={photo} />}
      <div className="image" onClick={isObject ? onOpenObject : null} />
      {text && (
        <Text
          text={text}
          isOwner={isOwner}
          date={date}
          isSelected={isSelected}
        />
      )}
      {!text && <Time time={date} />}
    </StyledPhoto>
  );
};

const StyledPhoto = styled.div`
  position: relative;
  width: 273px;
  min-height: 270px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "#5c5c5c")};
  margin: ${({ isOwner, isSelected }) =>
    isOwner
      ? `0 ${isSelected ? 25 : 11}px 0 auto`
      : `0 auto 0 ${isSelected ? 25 : 11}px`};
  padding: 1px;
  margin-bottom: 14px;
  transition: all 0.3s;
  .image {
    width: 271px;
    height: 268px;
    background: url(${({ photo }) => photo}) center/cover no-repeat, #000;
    border-radius: ${({ text }) => (text ? "12px 12px 0 0" : "12px")};
    ${({ loading }) => loading && "filter: blur(2px);"}
  }
  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
`;
