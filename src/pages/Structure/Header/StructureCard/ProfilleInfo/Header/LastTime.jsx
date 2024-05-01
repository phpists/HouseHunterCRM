import styled from "styled-components";
import { ReactComponent as Icon } from "../../../../../../assets/images/clock.svg";

export const LastTime = ({ date }) => (
  <StyledLastTime className="flex items-center notClickable">
    <Icon className="notClickable" />
    Остання активність {date?.substring(0, 10)}
  </StyledLastTime>
);

const StyledLastTime = styled.div`
  color: var(--main-color);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
  margin-bottom: 8px;
  width: max-content;
  width: max-content;
  white-space: nowrap;
  svg {
    margin-right: 4px;
    height: 12px;
    width: 12px;
  }
`;
