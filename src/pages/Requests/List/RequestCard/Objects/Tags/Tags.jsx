import styled from "styled-components";
import { Tag } from "./Tag";

export const Tags = () => (
  <StyledTags className="flex items-center">
    <Tag count={64} type="green" />
    <Tag count={8} type="red" />
    <Tag count={0} />
    <Tag count={15} title="нових" className="newTag" type="blue" />
  </StyledTags>
);

const StyledTags = styled.div`
  margin-bottom: 12px;
  gap: 6px;
  .newTag {
    margin-left: 8px;
    padding: 1px 6px 2px;
  }
`;
