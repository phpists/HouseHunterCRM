import styled from "styled-components";
import { ReactComponent as SortIcon } from "../../../../assets/images/sort.svg";
import { IconButton } from "../../../../components/IconButton";
import { useRef, useState } from "react";
import { Dropdown } from "./Dropdown";

export const SortButton = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const handleChangeValue = (val) => {
    onChange(val);
    if (btnRef.current) {
      btnRef.current.blur();
    }
    setOpen(false); // Explicitly close dropdown after selection
  };

  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <StyledSortButton
      ref={btnRef}
      onClick={handleToggleOpen}
      onBlur={() => setOpen(false)}
      tabIndex={0} // Ensure button is focusable
    >
      <IconButton
        Icon={SortIcon}
        className={`icon-btn sort-btn`}
        active={open}
        onClick={() => null}
      />
      <Dropdown value={value} onChange={handleChangeValue} open={open} />
    </StyledSortButton>
  );
};

const StyledSortButton = styled.button`
  position: relative;
  .sort-btn {
    svg {
      height: 15px;
    }
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
  &:focus-within {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
`;
