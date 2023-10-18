import { styled } from "styled-components";
import { UserCard } from "./UserCard";

export const Header = ({ photo, name, email }) => (
  <StyledHeader className="flex items-center justify-start">
    <UserCard photo={photo} name={name} email={email} />
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 20px 41px 20px 20px;
`;
