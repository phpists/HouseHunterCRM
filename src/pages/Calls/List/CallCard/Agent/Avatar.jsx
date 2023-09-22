import styled from "styled-components";
import avatar from "../../../../../assets/images/avatar.png";

export const Avatar = () => (
  <StyledAvatar avatar={avatar} className="clickable" />
);

const StyledAvatar = styled.div`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 34px;
  border: 1px solid #b1ff91;
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
  margin-right: 8px;
`;
