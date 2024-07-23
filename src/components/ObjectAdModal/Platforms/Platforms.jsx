import styled from "styled-components";
import { Title } from "./Title";
import { List } from "./List/List";

export const Platforms = ({ data, onChange }) => {
  return (
    <StyledPlatforms>
      <Title />
      <List data={data} onChange={onChange} />
    </StyledPlatforms>
  );
};

const StyledPlatforms = styled.div``;
