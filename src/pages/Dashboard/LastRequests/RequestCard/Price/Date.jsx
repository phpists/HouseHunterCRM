import styled from "styled-components";
import { ReactComponent as Timer } from "../../../../../assets/images/time.svg";

export const Date = ({ deadline }) => (
  <StyledDate className="flex items-center">
    <Timer />
    до {deadline}
  </StyledDate>
);

const StyledDate = styled.div`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  svg {
    height: 14px;
    width: 14px;
    margin-right: 4px;
    g {
      opacity: 1;
    }
    path {
      fill: #50f835;
    }
  }
`;
