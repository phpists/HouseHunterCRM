import { useState } from "react";
import { styled } from "styled-components";

export const Types = ({ types }) => {
  const [type, setType] = useState(types[0]);
  const [open, setOpen] = useState(false);

  return (
    <StyledTypes onClick={() => setOpen(!open)} className="flex items-center">
      {open &&
        types
          .filter((t) => t !== type)
          .map((t, i) => (
            <div key={i} className="opt" onClick={() => setType(t)}>
              {t}
            </div>
          ))}
      <div>{type}</div>
    </StyledTypes>
  );
};

const StyledTypes = styled.div`
  background: #414141;
  position: absolute;
  right: 0;
  top: 0;
  padding: 3px 3px 4px 10px;
  border-radius: 7px 0 0 7px;
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
`;
