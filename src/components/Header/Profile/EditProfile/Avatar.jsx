import { styled } from "styled-components";
import avatarIcon from "../../../../assets/images/avatar.png";
import editIcon from "../../../../assets/images/edit-avatar.svg";

export const Avatar = () => (
  <StyledAvatar
    avatarIcon={avatarIcon}
    className="flex items-center justify-center"
  >
    <img src={editIcon} alt="" />
  </StyledAvatar>
);

const StyledAvatar = styled.div`
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  border-radius: 13px;
  border: 1.5px solid #fff;
  background: url(${({ avatarIcon }) => avatarIcon}) center/cover no-repeat;
  margin-bottom: 19px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  img {
    z-index: 4;
    opacity: 0;
    transition: all 0.3s;
  }
  &::before {
    content: "";
    transition: all 0.3s;
  }
  &:hover {
    img {
      opacity: 1;
    }
    &::before {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      background: rgba(44, 44, 44, 0.6);
      z-index: 2;
    }
  }
`;
