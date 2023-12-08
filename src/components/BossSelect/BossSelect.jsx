import styled from "styled-components";
import { Empty } from "./Empty";
import { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";
import { Selected } from "./Selected";
import { useGetAllPerimissionsLevelsQuery } from "../../store/structure/structure.api";

export const BossSelect = ({ users, value, onChange, error }) => {
  const COLORS = ["#7ecefd", "#b1ff91", "#d0a0ff", "#7ecefd"];
  const [open, setOpen] = useState(false);
  const { data: levelsData } = useGetAllPerimissionsLevelsQuery();
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (levelsData[4]) {
      setLevels(levelsData[4][0]?.split(" - "));
    }
  }, [, levelsData]);

  return (
    <StyledBossSelect error={error}>
      {value && !open ? (
        <Selected
          onClick={() => setOpen(!open)}
          selected={users?.find((u) => u.id_user === value)}
          levels={levels}
        />
      ) : (
        <Empty open={open} onClick={() => setOpen(!open)} />
      )}
      {open && (
        <Dropdown
          users={users}
          onSelect={(val) => {
            onChange(val);
            setOpen(false);
          }}
          value={value}
          levels={levels}
          colors={COLORS}
        />
      )}
    </StyledBossSelect>
  );
};

const StyledBossSelect = styled.div`
  position: relative;
  ${({ error }) => error && "border: 1px solid red;"}
  border-radius: 9px;
`;
