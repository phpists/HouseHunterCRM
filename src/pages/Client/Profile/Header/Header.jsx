import { styled } from "styled-components";
import { Name } from "./Name";
import { Avatar } from "./Avatar";
import { Email } from "./Email";
import { Tag } from "./Tag";

export const Header = () => (
  <StyledHeader className="flex items-center justify-center">
    <Avatar />
    <div className="flex items-start">
      <div className="flex flex-col items-start mr-3">
        <Name />
        <Email />
      </div>
      <Tag />
    </div>
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 20px 41px 20px 20px;
  .avatar {
    border: none;
    height: 88px;
    width: 88px;
    padding: 15px;
    margin-bottom: 20px;
  }
`;
