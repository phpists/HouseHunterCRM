import { styled } from "styled-components";
import noPhoto from "../../assets/images/no-photo.svg";

export const Response = ({ onClick, parentMsg, rieltorName }) => {
  const isOwner = parentMsg.user === 0;
  const isPhoto = parentMsg?.messege?.title || parentMsg?.messege?.img;

  return (
    <StyledResponse
      onClick={onClick}
      isOwner={isOwner}
      isPhoto={isPhoto}
      photo={
        parentMsg?.messege?.img?.length > 0 ? parentMsg?.messege?.img : noPhoto
      }
      className="flex items-center"
    >
      {isPhoto && <div className="photo" />}
      <div>
        <div className="name" title={isOwner ? "Ви" : rieltorName}>
          {isOwner ? "Ви" : rieltorName}
        </div>
        <span>{isPhoto ? "Фотографія" : parentMsg?.messege}</span>
      </div>
    </StyledResponse>
  );
};

const StyledResponse = styled.div`
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.12);
  padding: ${({ isPhoto }) => (isPhoto ? "2px 7px 2px 2px" : "4px 7px 2px")};
  margin-bottom: 8px;
  color: var(--color-5);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  .name {
    color: ${({ isOwner }) =>
      isOwner ? "var(--green)" : "var(--chat-response-name)"};
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    height: 18px;
    width: 100%;
    max-width: 200px;
    overflow: hidden;
  }
  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    max-width: 200px;
  }
  .photo {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    margin-right: 9px;
    background: url(${({ photo }) => photo}) center/cover no-repeat;
  }
`;
