import { useState } from "react";
import styled from "styled-components";
import { Divider } from "../Divider";
import { ReactComponent as Arrows } from "../../../../assets/images/arrows.svg";

export const ToggleContent = ({ title = "-", children }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledToggleContent open={open}>
      <Arrows className="arrows" onClick={() => setOpen(!open)} />
      <Divider title={title} />
      <div className="fields">{open && <div>{children}</div>}</div>
    </StyledToggleContent>
  );
};

const StyledToggleContent = styled.div`
  .arrows {
    margin: 0 auto;
    transition: all 0.3s;
    cursor: pointer;
    transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
    &:hover {
      path {
        stroke-opacity: 1;
      }
    }
  }
  .fields {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    grid-auto-rows: max-content;
  }
  .field-group {
    display: flex;
    gap: 4px;
  }
`;
