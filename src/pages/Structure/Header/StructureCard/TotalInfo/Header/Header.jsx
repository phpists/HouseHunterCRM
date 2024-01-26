import styled from "styled-components";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/images/calendar.svg";
import { Dropdown } from "./Dropdown/Dropdown";

export const Header = ({
  open,
  active,
  onToggleActive,
  period,
  onChangePeriod,
}) => {
  return (
    <StyledHeader
      className="flex items-center justify-between clickable notClickable"
      open={open}
      onClick={onToggleActive}
      active={active}
    >
      <Icon />
      {open && (
        <>
          <Text period={period} />
          <CalendarIcon className="notClickable" />
        </>
      )}
      {active && <Dropdown period={period} onChangePeriod={onChangePeriod} />}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  padding: ${({ open }) => (open ? "4px 16px 4px 4px" : "4px")};
  border-radius: 6px;
  background: #3d3d3d;
  margin-bottom: 8px;
  position: relative;
  svg {
    cursor: pointer;
    g {
      transition: all 0.3s;
    }
    &:hover {
      g {
        opacity: 1;
      }
    }
  }

  ${({ active }) =>
    active &&
    `
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.30);
    g {
    opacity: 1 !important;
  }
  `}

  @media (max-width: 850px) {
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    g {
      opacity: 1 !important;
    }
  }
`;
