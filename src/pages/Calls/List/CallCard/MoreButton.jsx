import styled from "styled-components";
import { ReactComponent as Dots } from "../../../../assets/images/options.svg";

export const MoreButton = () => (
  <StyledMoreButton className="flex items-center justify-center">
    <Dots />
  </StyledMoreButton>
);

const StyledMoreButton = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1.4px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(18.5px);
  margin: 14px 0 0 20px;
  &:hover {
    border: 1.4px solid rgba(255, 255, 255, 1);
    g {
      opacity: 1;
    }
  }
`;
