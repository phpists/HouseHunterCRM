import { styled } from "styled-components";
import { List } from "./List";
import { Divider } from "./Divider";
import { Text } from "./Text";

export const Structure = () => (
  <StyledStructure className="flex items-center">
    <List />
    <Divider />
    <Text />
  </StyledStructure>
);

const StyledStructure = styled.div``;
