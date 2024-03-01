import { styled } from "styled-components";
import avatarIcon from "../../../../../assets/images/edit-worker-avatar.png";
import editIcon from "../../../../../assets/images/edit-avatar.svg";

export const Avatar = ({ isScrolled }) => (
  <StyledAvatar
    avataricon={avatarIcon}
    className="flex items-center justify-center"
    isScrolled={isScrolled}
  >
    <img src={editIcon} alt="" />
  </StyledAvatar>
);

const StyledAvatar = styled.div`
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  border-radius: 13px;
  background: url(${({ avataricon }) => avataricon}) center/cover no-repeat;
  margin-bottom: 19px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  border: 1.5px solid transparent;
  img {
    z-index: 4;
    opacity: 0;
    transition: all 0.3s;
  }
  &::before {
    content: "";
    transition: all 0.3s;
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 14px;
    z-index: 1;
  }
  &:hover {
    border: 1.5px solid rgba(255, 255, 255, 0.4);

    img {
      opacity: 1;
    }
    &::before {
      background: rgba(44, 44, 44, 0.7);
      backdrop-filter: blur(3.5px);
    }
  }
  ${({ isScrolled }) =>
    isScrolled &&
    `
    width: 46px;
    height: 46px;
    margin: 0 10px 0 0;
    &:hover {
        border: none;
        img {
            opacity: 0;
        }
        &::before {
            display: none;
        }
    }
  `}
`;
