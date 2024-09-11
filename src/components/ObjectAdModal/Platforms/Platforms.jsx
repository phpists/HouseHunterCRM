import styled from "styled-components";
import { Title } from "./Title";
import { List } from "./List/List";

export const Platforms = ({ data, onChange, onChangeActiveTab }) => {
  return (
    <StyledPlatforms>
      <Title />
      <List
        data={data}
        onChange={onChange}
        onChangeActiveTab={onChangeActiveTab}
      />
    </StyledPlatforms>
  );
};

const StyledPlatforms = styled.div``;
