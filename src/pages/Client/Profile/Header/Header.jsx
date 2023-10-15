import { styled } from "styled-components";
import { UserCard } from "./UserCard";

export const Header = () => (
  <StyledHeader className="flex items-center justify-center">
    <UserCard />
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 20px 41px 20px 20px;
`;
