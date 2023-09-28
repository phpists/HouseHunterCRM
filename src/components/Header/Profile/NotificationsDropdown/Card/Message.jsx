import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../../../assets/images/welcome-step-arrow.svg";

export const Message = ({ message }) => (
  <StyledMessage className="flex items-center justify-between">
    <div>{message}</div>
    <Arrow />
  </StyledMessage>
);

const StyledMessage = styled.div`
  color: #fff;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: 20px; /* 142.857% */
  cursor: pointer;
  padding: 0 12px 12px;
  &:hover {
    path {
      fill-opacity: 1;
    }
  }
`;
