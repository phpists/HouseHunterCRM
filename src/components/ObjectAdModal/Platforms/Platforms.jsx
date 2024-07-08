import styled from "styled-components";
import { Title } from "./Title";
import { List } from "./List/List";

export const Platforms = () => {
  return (
    <StyledPlatforms>
      <Title />
      <List />
    </StyledPlatforms>
  );
};

const StyledPlatforms = styled.div``;
