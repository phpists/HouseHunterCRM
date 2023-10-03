import styled from "styled-components";
import { useState } from "react";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";

export const CallCard = ({ selected, onSelect, openMore, onOpenMore }) => {
  const [open, setOpen] = useState();

  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  return (
    <StyledCallCard
      className=" clickable"
      onClick={handleClick}
      selected={selected}
    >
      <DesktopContent
        open={open}
        onToggleOpen={() => setOpen(!open)}
        openMore={openMore}
        onOpenMore={onOpenMore}
      />
      <MobileContent
        open={open}
        onToggleOpen={() => setOpen(!open)}
        openMore={openMore}
        onOpenMore={onOpenMore}
      />
    </StyledCallCard>
  );
};

const StyledCallCard = styled.div`
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  background: #3d3d3d;
  border: 1px solid rgba(255, 255, 255, 0);
  transition: all 0.3s;
  position: relative;
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  ${({ selected }) =>
    selected &&
    `
      border: 1px solid rgba(255, 255, 255, 1) !important;
  `}

  @media (max-width: 1600px) {
    padding: 10px;
  }
`;
