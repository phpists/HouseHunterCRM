import { styled } from "styled-components";
import { Phone } from "./Phone";
import { Arrow } from "./Arrow";
import { useState } from "react";
import { Dropdown } from "./Dropdown";

export const Phones = ({ top, className, classNameContent, phones }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledPhones open={open} className={`${className}`}>
      <Phone
        showOnHoverIcon
        className={classNameContent}
        phone={phones?.length > 0 ? phones[0] : ""}
      />
      <Arrow
        open={open}
        onToggleOpen={() => (phones?.length > 1 ? setOpen(!open) : null)}
      />
      <Dropdown
        open={open}
        onSelect={() => setOpen(false)}
        top={top}
        options={phones?.filter((p, i) => i !== 0) ?? []}
      />
    </StyledPhones>
  );
};

const StyledPhones = styled.div`
  position: relative;
  border-radius: ${({ open }) => (open ? "6px 6px 0 0" : "6px")};
  flex-shrink: 0;
  height: max-content;
  display: grid;
  grid-template-columns: max-content max-content;
  width: max-content;
`;
