import styled from "styled-components";
import avatar from "../../../../../../assets/images/profile-avatar.svg";

export const Avatar = () => (
  <StyledAvatar avatar={avatar} className="notClickable" />
);

const StyledAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 64px;
  border: 1px solid #25d3de;
  background: url(${({ avatar }) => avatar}), center/cover no-repeat;
  margin-right: 10px;
`;
