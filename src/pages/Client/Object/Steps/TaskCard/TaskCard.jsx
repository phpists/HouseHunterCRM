import { styled } from "styled-components";
import { DateTag } from "./DateTag";
import { Price } from "./Price";
import { MainInfo } from "./MainInfo/MainInfo";
import { useState } from "react";
import { MoreInfo } from "./MoreInfo/MoreInfo";

export const TaskCard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) =>
    e.target.classList.contains("task-card") && !open && setOpen(true);

  return (
    <StyledTaskCard
      className={`task-card ${open && "active"}`}
      onClick={handleOpen}
    >
      {!open && (
        <div className="flex items-center justify-between mb-5">
          <DateTag />
          <Price />
        </div>
      )}
      <div className="flex items-center justify-between ">
        <MainInfo open={open} />
      </div>
      {open && <MoreInfo onClose={() => setOpen(false)} />}
    </StyledTaskCard>
  );
};

const StyledTaskCard = styled.div`
  padding: 7px 10px 7px 7px;
  border-radius: 9px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  &.active {
    padding: 7px 10px 0px;
  }
`;
