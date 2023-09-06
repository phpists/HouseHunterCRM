import { styled } from "styled-components";
import { Text } from "./Text";
import { Contacts } from "./Contacts";

export const Info = () => {
  return (
    <StyledInfo>
      <Text />
      <Contacts />
    </StyledInfo>
  );
};

const StyledInfo = styled.div``;
