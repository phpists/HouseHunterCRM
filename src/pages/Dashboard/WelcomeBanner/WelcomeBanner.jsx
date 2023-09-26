import styled from "styled-components";
import { Text } from "./Text";
import { Divider } from "./Divider";
import { Steps } from "../Steps/Steps";
import { CloseButton } from "./CloseButton";

export const WelcomeBanner = ({ onClose }) => {
  return (
    <StyledWelcomeBanner className="flex items-center justify-between">
      <Text />
      <Divider />
      <Steps />
      <CloseButton onClose={onClose} />
    </StyledWelcomeBanner>
  );
};

const StyledWelcomeBanner = styled.div`
  background: #686de7;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 40px 100px;
  position: relative;
  margin-bottom: 20px;
`;
