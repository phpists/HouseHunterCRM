import { useEffect, useState } from "react";
import styled from "styled-components";
import { Divider } from "../Divider";
import { ReactComponent as Arrows } from "../../../../assets/images/arrows.svg";

export const ToggleContent = ({
  title = "-",
  error,
  children,
  errorsUpdated,
  onScrollToErrorFields,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(error);
    }
  }, [errorsUpdated, error]);

  useEffect(() => {
    if (onScrollToErrorFields && error) {
      setTimeout(onScrollToErrorFields, 200);
    }
  }, [errorsUpdated, error]);

  return (
    <StyledToggleContent
      open={open}
      className={error && !open ? "error-field" : ""}
    >
      <Arrows className="arrows" onClick={() => setOpen(!open)} />
      <Divider title={title} className="toggle-divider" />
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
  &.error-field {
    .arrows {
      path {
        stroke: red;
        stop-opacity: 1;
      }
    }
    .toggle-divider {
      div {
        background: red;
        height: 2px;
        opacity: 0.5;
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
