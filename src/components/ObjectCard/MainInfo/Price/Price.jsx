import styled from "styled-components";
import { Closed } from "./Closed";
import { useState } from "react";
import { Manage } from "./Manage/Manage";

export const Price = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledPrice onMouseLeave={() => setOpen(false)}>
      {open ? <Manage /> : <Closed onOpen={() => setOpen(true)} />}
    </StyledPrice>
  );
};

const StyledPrice = styled.div`
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
  width: 100%;
  transition: all 0.3s;
  height: 32px;
`;
