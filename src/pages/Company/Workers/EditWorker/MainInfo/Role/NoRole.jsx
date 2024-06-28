import { styled } from "styled-components";
import { ReactComponent as PlusIcon } from "../../../../../../assets/images/plus.svg";

export const NoRole = () => (
  <StyledNoRole className="flex items-center">
    <span>Немає ролі</span>
    <PlusIcon />
  </StyledNoRole>
);

const StyledNoRole = styled.div`
  padding: 2px 3px 2px 2px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  span {
    padding: 4px 6px 1px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    color: var(--main-color);
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
