import { styled } from "styled-components";
import { Name } from "./Name";
import { Avatar } from "./Avatar";
import { Email } from "./Email";
import { Tag } from "./Tag";
import { UserCard } from "./UserCard";

export const Header = () => (
  <StyledHeader className="flex items-center justify-center">
    <UserCard />
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 20px 41px 20px 20px;
`;
