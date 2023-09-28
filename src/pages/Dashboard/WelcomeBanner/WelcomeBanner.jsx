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
      <Steps className="steps" />
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
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: start;
    padding: 40px;
    .steps {
      width: 100%;
    }
  }
  @media (max-width: 600px) {
    padding: 20px;
  }
`;
