import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const AccordionWrapper = styled.div`
  max-width: 600px;
  font-family: Overpass, sans-serif;
`;

const AccordionItem = styled.div`
  border-radius: 9px;
  position: relative;
  width: 100%;
`;

const AccordionTitle = styled.button`
  padding: 6px 10px;
  font-family: Open Sans;
  opacity: 0.4;
  color: var(--main-color, #fff);
  font-size: 14px;
  line-height: 118%;
  letter-spacing: 0.3px;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 9px;
  transition: all 0.1s;

  &:hover {
    background: var(--card-bg-2, #2c2c2e);
    opacity: 1;
  }

  span {
    height: 32px;
    display: flex;
    align-items: center;
  }
`;

const ObjectsFilterYear = ({ onSubmit, initial }) => {
  const [showModal, setShowModal] = useState(false);

  const isShowYear = initial[0] !== 0;
  const isShowToYear = initial[1] !== 0;

  return (
    <>
      <AccordionWrapper>
        <AccordionItem>
          <AccordionTitle onClick={() => setShowModal(true)}>
            <span>
              Рік випуску {isShowYear && initial[0]}
              {isShowToYear && " - "}
              {isShowToYear && initial[1]}
            </span>
          </AccordionTitle>
        </AccordionItem>
      </AccordionWrapper>

      {showModal && (
        <Modal
          initial={initial}
          onSubmit={onSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ObjectsFilterYear;
