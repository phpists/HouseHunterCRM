import { styled } from "styled-components";
import clockIcon from "../../../../../assets/images/clock-color.svg";

export const DateTag = () => (
  <StyledDateTag className="flex items-end">
    <img src={clockIcon} alt="" />
    20.09.23 12:43
  </StyledDateTag>
);

const StyledDateTag = styled.div`
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.15);
  padding: 2px 6px 2px 2px;
  overflow: hidden;
  color: var(--second-color);
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 12px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 14.16px */
  letter-spacing: 0.24px;
  img {
    margin-right: 4px;
  }
`;
