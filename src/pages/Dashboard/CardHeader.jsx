import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../src/assets/images/welcome-step-arrow.svg";

export const CardHeader = ({ title }) => (
  <StyledCardHeader className="flex items-center justify-between">
    <div className="title">{title}</div>
    <Arrow className="link-arrow" />
  </StyledCardHeader>
);

const StyledCardHeader = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: 0.36px;
  margin-bottom: 11px;
  cursor: pointer;
  svg {
    path {
      fill: #fff;
    }
  }
  &:hover {
    path {
      fill-opacity: 1;
    }
  }
`;
