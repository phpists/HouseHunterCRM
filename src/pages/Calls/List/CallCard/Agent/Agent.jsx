import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Tag } from "./Tag";

export const Agent = ({ name, photo, level }) => (
  <StyledAgent className="flex items-center clickable">
    <Avatar photo={photo} level={level} />
    <div className="clickable">
      <Name name={name} />
      <Tag level={level} />
    </div>
  </StyledAgent>
);

const StyledAgent = styled.div`
  padding: 8px 10px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.05);
  width: 185px;
  height: 60px;
  @media (max-width: 1399.9px) {
    width: 100%;
  }
`;
