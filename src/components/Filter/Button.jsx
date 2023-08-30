import { styled } from "styled-components";
import { ReactComponent as FilterIcon } from "../../assets/images/filter.svg";

export const Button = ({ open, onClick }) => (
  <StyledButton
    className="flex items-center justify-center"
    onClick={onClick}
    open={open}
  >
    <FilterIcon />
  </StyledButton>
);

const StyledButton = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
  g {
    transition: all 0.3s;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid transparent;

    g {
      opacity: 1;
    }
  }
  ${({ open }) =>
    open &&
    `
    background: rgba(255, 255, 255, 0.2);
    g {
        opacity: 1;
    }
  `}
`;
