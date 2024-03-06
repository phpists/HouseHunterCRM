import { useState } from "react";
import { styled } from "styled-components";

export const Types = ({ types, typeValue, onChangeType }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledTypes onClick={() => setOpen(!open)} className="flex items-center">
      <div className="first-angle" />
      <div className="second-angle" />
      {open &&
        types
          .filter((t) => t?.value !== typeValue)
          .map((t, i) => (
            <div key={i} className="opt" onClick={() => onChangeType(t.value)}>
              {t?.title}
            </div>
          ))}
      <div>
        {types?.find((t) => t.value === typeValue)?.title ?? "Оберіть тип"}
      </div>
    </StyledTypes>
  );
};

const StyledTypes = styled.div`
  background: #414141;
  position: absolute;
  right: 0;
  top: 0;
  padding: 3px 3px 4px 10px;
  border-radius: 0 0 0 7px;
  transition: all 0.3s;
  div {
    color: #fff;
    text-align: center;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    text-transform: uppercase;
    opacity: 0.3;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .opt {
    margin-right: 15px;
  }
  .first-angle {
    z-index: 2;
    opacity: 1;
    &::before {
      content: "";
      display: block;
      position: absolute;
      bottom: 14px;
      left: -15.299999999999997px;
      width: 0;
      height: 0;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      transform: rotate(45deg);
      border-bottom: 13px solid #414141;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -4.2px;
      left: -24px;
      height: 26px;
      width: 24px;
      border-radius: 100%;
      z-index: 100;
      background: #4b4b4b;
    }
  }
  .second-angle {
    opacity: 1;
    position: absolute;
    right: 0;
    width: 30px;
    height: 22px;
    opacity: 1;
    bottom: 0px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      bottom: -2px;
      left: 13.700000000000003px;
      width: 0;
      height: 0;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      transform: rotate(45deg);
      border-bottom: 13px solid #414141;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -16px;
      left: 13.86px;
      height: 16px;
      width: 16.3px;
      border-radius: 100%;
      z-index: 100;
      background: #4b4b4b;
    }
  }
`;
