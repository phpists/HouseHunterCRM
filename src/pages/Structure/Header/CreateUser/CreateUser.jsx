import styled from "styled-components";
import plusIcon from "../../../../assets/images/plus.svg";
import { Modal } from "./Modal/Modal";
import { useState } from "react";
import { SmallButton } from "./SmallButton";

export const CreateUser = ({ small, onCreatedUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <Modal onClose={() => setOpen(false)} onCreatedUser={onCreatedUser} />
      )}
      {small ? (
        <SmallButton onClick={() => setOpen(true)} />
      ) : (
        <StyledCreateUser
          className="flex items-center"
          onClick={() => setOpen(true)}
        >
          <button className="plus-icon flex items-center justify-center">
            <img src={plusIcon} alt="" />
          </button>
          Створити <span className="more">працівника</span>
        </StyledCreateUser>
      )}
    </>
  );
};

const StyledCreateUser = styled.button`
  height: 32px;
  padding: 5px 16px 6px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  text-transform: capitalize;
  transition: all 0.3s;
  margin-right: 20px;
  white-space: nowrap;
  .more {
    margin-left: 5px;
    @media (min-width: 850px) {
      display: none;
    }
    @media (min-width: 920px) {
      display: inline;
    }
  }
  .plus-icon {
    width: 26px;
    height: 26px;
    padding: 4px;
    margin-right: 4px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
