import styled from "styled-components";
import icon from "../../../../assets/images/BiRocket.svg";
import { ObjectAdModal } from "../../../../components/ObjectAdModal/ObjectAdModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const MlsButton = ({ value, onChange, visible }) => {
  const { pathname } = useLocation();
  const IS_AD = pathname?.includes("edit-ad");
  const [modal, setModal] = useState(false);

  return (
    <>
      {" "}
      {modal ? (
        <ObjectAdModal onClose={() => setModal(null)} object={modal} />
      ) : null}
      <StyledMlsButton
        className={`${(value || IS_AD) && "active"}`}
        onClick={IS_AD ? () => setModal(true) : () => onChange()}
        visible={visible}
      >
        {IS_AD ? <img src={icon} alt="" /> : "MLS"}
      </StyledMlsButton>
    </>
  );
};

const StyledMlsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  border-radius: 6px;
  height: 46px;
  flex-shrink: 0;
  background: var(--bg-15);
  color: var(--color-5);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 0; /* 16.52px */
  letter-spacing: 0.28px;
  text-transform: uppercase;
  transition: all 0.3s;
  flex-shrink: 0;
  white-space: nowrap;
  opacity: 0;
  width: 0;
  overflow: hidden;
  ${({ visible }) =>
    visible &&
    `
    width: 50px;
    opacity: 1;
    padding: 10px 10px;
    margin-left: 5px;
  `}
  &:hover {
    color: var(--main-color);
    background: #3d8ecc;
    opacity: 0.5;
  }

  &.active {
    color: var(--main-color);
    background: #3d8ecc;
    opacity: 1 !important;
  }

  @media (max-width: 800px) {
    font-size: 11px;
  }
`;
