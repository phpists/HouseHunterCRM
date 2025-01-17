import { styled } from "styled-components";
import { ReactComponent as ArrowDown } from "../../../../assets/images/arrow-down.svg";

export const Header = ({ open, onToggleOpen }) => {
  return (
    <StyledHeader
      className="flex items-center justify-between"
      onClick={onToggleOpen}
      open={open}
    >
      <span>Дані автомобілю</span>
      <ArrowDown />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 8px;
  color: var(--second-color);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  svg {
    display: none;
    cursor: pointer;
    transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
    transition: all 0.3s;
    path {
      fill: #fff;
    }
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
  @media (max-width: 800px) {
    font-size: 18px;
    ${({ open }) => !open && "margin: 0;"}
    svg {
      display: block;
    }
  }
`;
