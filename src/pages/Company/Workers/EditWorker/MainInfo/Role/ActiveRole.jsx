import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../../../../assets/images/arrow-down.svg";

export const ActiveRole = () => (
  <StyledActiveRole className="flex items-center active-role">
    <span>Керівник</span>
    <ArrowIcon />
  </StyledActiveRole>
);

const StyledActiveRole = styled.div`
  padding: 2px 3px 2px 2px;
  border-radius: 7px;
  background: rgba(88, 175, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s;
  span {
    padding: 4px 6px 1px;
    border-radius: 5px;
    background: rgba(88, 175, 255, 0.3);
    color: #58afff;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 12.98px */
    letter-spacing: 0.22px;
    text-transform: uppercase;
    margin-right: 3px;
  }
  g {
    transition: all 0.3s;
  }
  &:hover {
    g {
      opacity: 1;
    }
  }
`;
