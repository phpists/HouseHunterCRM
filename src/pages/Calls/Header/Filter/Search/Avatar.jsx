import styled from "styled-components";
import avatar from "../../../../../assets/images/profile-avatar.svg";

export const Avatar = () => <StyledAvatar avatar={avatar} />;

const StyledAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  border: 1px solid var(--green-light);
  margin-right: 8px;
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
`;
