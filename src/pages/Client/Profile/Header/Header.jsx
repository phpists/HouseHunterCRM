import { styled } from "styled-components";
import { ClientAvatar } from "../../../../components/ClientAvatar";
import { Name } from "./Name";

export const Header = () => (
  <StyledHeader className="flex flex-col items-center justify-center">
    <ClientAvatar type={1} className="avatar" />
    <Name />
  </StyledHeader>
);

const StyledHeader = styled.div`
  height: 199px;
  .avatar {
    border: none;
    height: 88px;
    width: 88px;
    padding: 15px;
    margin-bottom: 10px;
  }
`;
