import styled from "styled-components";
import { Empty } from "./Empty";
import { useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";
import { Selected } from "./Selected";

export const BossSelect = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(true);

  return (
    <StyledBossSelect>
      {selected && !open ? (
        <Selected onClick={() => setOpen(!open)} />
      ) : (
        <Empty open={open} onClick={() => setOpen(!open)} />
      )}
      {open && (
        <Dropdown
          onSelect={() => {
            setSelected(true);
            setOpen(false);
          }}
        />
      )}
    </StyledBossSelect>
  );
};

const StyledBossSelect = styled.div`
  position: relative;
`;
