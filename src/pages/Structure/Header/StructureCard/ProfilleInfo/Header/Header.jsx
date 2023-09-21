import styled from "styled-components";
import { Avatar } from "./Avatar";
import { LastTime } from "./LastTime";
import { Name } from "./Name";
import { Id } from "./Id";
import { Tag } from "./Tag";
import { Date } from "./Date";
import { Divider } from "../Divider";

export const Header = () => (
  <StyledHeader className="flex items-center notClickable">
    <Avatar />
    <div>
      <LastTime />
      <div className="flex items-baseline main-text notClickable">
        <Name />
        <Id />
      </div>
      <Tag />
      <Date />
    </div>
  </StyledHeader>
);

const StyledHeader = styled.div`
  margin: 0 0 0 -32px;
  position: relative;
  z-index: 2;
  .main-text {
    margin-bottom: 2px;
  }
`;
