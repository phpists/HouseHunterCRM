import styled from "styled-components";
import img from "../../../../../../assets/images/small-avatar-green.svg";
import addAvatar from "../../../../../../assets/images/add-avatar.svg";

export const Avatar = () => (
  <StyledAvatar avatar={img}>
    <img src={addAvatar} alt="" />
  </StyledAvatar>
);

const StyledAvatar = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 100%;
  position: relative;
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
  margin-right: 16px;
  img {
    position: absolute;
    bottom: 0;
    right: -5px;
    cursor: pointer;
  }
`;
