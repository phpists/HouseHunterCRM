import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Tag } from "./Tag";

export const BossCard = () => (
  <StyledBossCard className="flex items-center">
    <Avatar />
    <div>
      <Name />
      <Tag />
    </div>
  </StyledBossCard>
);

const StyledBossCard = styled.div`
  padding: 8px 10px;
`;
