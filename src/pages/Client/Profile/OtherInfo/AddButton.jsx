import { styled } from "styled-components";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";
import { useRef } from "react";

export const AddButton = ({ onAdd }) => (
  <StyledAddButton className="flex items-center justify-center">
    <PlusIcon />
    <input
      type="file"
      name=""
      id=""
      accept="image/png, image/jpg, image/jpeg, image/jpeg, image/png,image/webp,image/heic"
      value=""
      onChange={(e) => onAdd(e.target.files)}
      multiple
    />
  </StyledAddButton>
);

const StyledAddButton = styled.div`
  width: 71px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  margin-right: 3px;
  svg {
    height: 20px;
    width: 20px;
  }
  g {
    transition: all 0.3s;
  }
  &:hover {
    background: #fff;
    border: 1px solid #fff;
    g {
      opacity: 1;
    }
    path {
      fill: #2c2c2c;
    }
  }
  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
`;
