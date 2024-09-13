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
  };

  return (
    <StyledSortButton
      ref={btnRef}
      onClick={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <IconButton
        Icon={SortIcon}
        className={`icon-btn sort-btn`}
        active={open}
        onClick={() => null}
      />
      <Dropdown value={value} onChange={handleChangeValue} />
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
  &:focus {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
`;
