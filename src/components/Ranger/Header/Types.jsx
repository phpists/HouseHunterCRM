import { useState } from "react";
import { styled } from "styled-components";

export const Types = ({ types, typeValue, onChangeType, typeError }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledTypes
      onClick={() => setOpen(!open)}
      className="flex items-center"
      error={typeError}
    >
      <span className="first-angle" />
      <span className="second-angle" />
      {true &&
        types.map((t, i) => (
          <div
            key={i}
            className={`option opt ${typeValue === t.value && "active"}`}
            onClick={() => onChangeType(t.value)}
          >
            {t?.title}
          </div>
        ))}
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
    color: ${({ error }) => (error ? "red" : "rgba(255,255,255, 0.4)")};
    text-align: center;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 0.5;
    letter-spacing: 0.22px;
    text-transform: uppercase;
    opacity: 1;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    &.active {
      border: 1px solid #808080;
      z-index: 10;
      position: relative;
    }
  }
  .opt {
    margin-right: 5px;
    cursor: pointer;
  }
  .option {
    padding: 4px;
    border-radius: 4px;
    z-index: 10;
    height: 16px;
  }
  .first-angle {
    z-index: 2;
    opacity: 1;
    &::before {
      content: "";
      display: block;
      position: absolute;
      bottom: 20px;
      left: -16.3px;
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
      bottom: -1.22px;
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
      bottom: -5px;
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
