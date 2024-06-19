import styled from "styled-components";
import { ReactComponent as Icon } from "../../assets/images/support.svg";

export const Support = ({ onClick }) => (
  <StyledSupport className="flex items-center justify-center">
    <Icon className="support-icon" onClick={onClick} />
  </StyledSupport>
);

const StyledSupport = styled.div`
  .support-icon {
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.3s;
    path {
      fill: #fff;
    }
    &:hover {
      opacity: 1;
    }
  }
`;
