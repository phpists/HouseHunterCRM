import styled from "styled-components";
import { Title } from "./Title";
import { List } from "./List/List";

export const Platforms = ({
  data,
  onChange,
  onChangeActiveTab,
  activeTab,
  activeAds,
}) => {
  return (
    <StyledPlatforms>
      <Title />
      <List
        data={data}
        onChange={onChange}
        onChangeActiveTab={onChangeActiveTab}
        activeTab={activeTab}
        activeAds={activeAds}
      />
    </StyledPlatforms>
  );
};

const StyledPlatforms = styled.div``;
