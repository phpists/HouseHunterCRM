import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Role } from "./Role";

export const Agent = () => (
  <StyledAgent className="flex items-center">
    <Avatar />
    <div>
      <Name />
      <Role />
    </div>
  </StyledAgent>
);

const StyledAgent = styled.div`
  gap: 8px;
  background: var(--bg-5);
  border-radius: 9px;
  padding: 10px;
  flex-shrink: 0;
  @media (max-width: 700px) {
    width: 100%;
    flex-shrink: 1;
  }
`;
