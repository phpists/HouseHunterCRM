import { styled } from "styled-components";
import { ReactComponent as PlusIcon } from "../../../../../../assets/images/plus.svg";

export const AddButton = ({ onClick }) => (
  <StyledAddButton
    className="flex items-center justify-between"
    onClick={onClick}
  >
    <span>Додати ще один</span>
    <PlusIcon />
  </StyledAddButton>
);

const StyledAddButton = styled.div`
  border-radius: 1px 0px 9px 9px;
  padding: 6px 6px 6px 10px;
  color: var(--second-color);
  font-family: Overpass;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 118%; /* 14.16px */
  letter-spacing: 0.24px;
  transition: all 0.3s;
  cursor: pointer;
  g {
    transition: all 0.3s;
  }
  &:hover {
    background: var(--card-bg-2);
    color: var(--color-2);
    g {
      opacity: 1;
    }
  }
`;
