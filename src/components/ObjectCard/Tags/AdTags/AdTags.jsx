import styled from "styled-components";
import { Resource } from "./Resource";
import { Status } from "./Status";

export const AdTags = () => {
  return (
    <StyledAdTags>
      <Resource />
      <Status />
    </StyledAdTags>
  );
};

const StyledAdTags = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;
