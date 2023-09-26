import styled from "styled-components";
import avatar from "../../../../../assets/images/small-user-purple.svg";

export const Avatar = () => <StyledAvatar avatar={avatar} />;

const StyledAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 12px;
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
`;
