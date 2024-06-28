import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/images/arrow-down.svg";
import { useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";

export const SelectionsSelect = ({ value, onChange, data }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setOpen(false);
    setSearch("");
  };
  const handleSelectOpt = (val) => {
    handleClose();
    onChange(val);
  };

  return (
    <>
      <StyledSelectionsSelect
        className="flex items-center justify-between"
        onClick={() => setOpen(true)}
      >
        <div className="value">
          {open ? (
            <input
              type="text"
              placeholder="Пошук"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          ) : value ? (
            data?.find((s) => s.id === value)?.name ?? "-"
          ) : (
            "Оберіть папку"
          )}
        </div>
        <Arrow className="select-arrow" />
      </StyledSelectionsSelect>
      {open && (
        <Dropdown
          data={data?.filter(
            ({ name, client }) =>
              name?.toLowerCase()?.includes(search.toLowerCase()) ||
              client?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
              client?.phones[0]?.phone
                ?.toLowerCase()
                ?.includes(search.toLowerCase())
          )}
          value={value}
          onChange={handleSelectOpt}
        />
      )}
      {open && <div className="modal-overlay" onClick={handleClose}></div>}
    </>
  );
};

const StyledSelectionsSelect = styled.div`
  height: 40px;
  padding: 10px;
  border-radius: 6px;
  background: var(--selection-bg);
  position: relative;
  margin-bottom: 4px;
  z-index: 100;
  .value {
    font-family: Overpass;
    font-size: 14px;
    font-weight: var(--font-weight-200);
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
  }
  .select-arrow {
    path {
      fill: #ffff;
    }
  }
`;
