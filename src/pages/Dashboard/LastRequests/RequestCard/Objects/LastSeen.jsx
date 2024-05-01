import styled from "styled-components";
import { ReactComponent as Timer } from "../../../../../assets/images/time.svg";

export const LastSeen = () => (
  <StyledLastSeen className="flex items-center">
    <Timer />
    переглянуто 9 хв тому
  </StyledLastSeen>
);

const StyledLastSeen = styled.div`
  color: var(--second-color);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  margin-bottom: 10px;
  svg {
    margin-right: 4px;
    width: 12px;
    height: 12px;
  }
`;
