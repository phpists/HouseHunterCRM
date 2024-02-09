import styled from "styled-components";
import { Modal } from "./Modal/Modal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const CreateRole = ({ onRefetchStructureData }) => {
  const { search } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(search === "?roles=true");
  }, [search]);

  return (
    <>
      {open && (
        <Modal
          onClose={() => setOpen(false)}
          onRefetchStructureData={onRefetchStructureData}
        />
      )}
      <StyledCreateRole onClick={() => setOpen(true)}>
        {/* Створення ролей */}
        Налаштування ролей
      </StyledCreateRole>
    </>
  );
};

const StyledCreateRole = styled.button`
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 28px;
  height: 32px;
  color: #fff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 1.5; /* 17.7px */
  letter-spacing: 0.3px;
  text-transform: capitalize;
  transition: all 0.3s;
  &:hover {
    background: #fff;
    color: #2c2c2c;
  }
`;
