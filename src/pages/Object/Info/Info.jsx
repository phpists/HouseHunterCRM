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
  height: calc(100svh - 248px);
  overflow: auto;
`;
