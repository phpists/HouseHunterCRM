import { styled } from "styled-components";
import { Button } from "./Button";
import { useState } from "react";
import { Dropdown } from "./Dropdown";

export const Filter = ({ className, filter, onFilterChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledFilter className={`flex items-center justify-center ${className}`}>
      <Button open={open} onClick={() => setOpen(!open)} />
      <Dropdown open={open} filter={filter} onFilterChange={onFilterChange} />
      {open && (
        <div
          className="modal-overlay"
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      )}
    </StyledFilter>
  );
};

const StyledFilter = styled.button`
  position: relative;
`;
