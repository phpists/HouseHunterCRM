import { styled } from "styled-components";
import { Text } from "./Text";
import { Contacts } from "./Contacts";

export const Info = () => {
  return (
    <StyledInfo className="hide-scroll">
      <Text />
      <Contacts />
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  height: calc(100svh - 228px);
  overflow: auto;
  border-radius: 10px;
  @media (max-width: 1300px) {
    height: max-content;
    grid-column: 1/3;
  }
  @media (max-width: 800px) {
    grid-column: 1/2;
  }
`;
