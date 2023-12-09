import { styled } from "styled-components";
import { List } from "./List";
import { Divider } from "./Divider";
import { Text } from "./Text";

export const StructureCard = ({ count, level, levelTitle, photos }) => (
  <StyledStructureCard className="flex items-center">
    <List photos={photos?.slice(0, 3)} level={level} />
    <Divider />
    <Text count={count} level={levelTitle} />
  </StyledStructureCard>
);

const StyledStructureCard = styled.div``;
