import styled from "styled-components";
import { Phones } from "../../../../Phones/Phones";
import { useState } from "react";
import { ShowButton } from "./ShowButton";

export const Phone = ({ commentOpen }) => {
  const [show, setShow] = useState(false);

  return (
    <StyledPhone>
      {show ? (
        <Phones className={commentOpen ? "" : "phones"} />
      ) : (
        <ShowButton
          onClick={() => setShow(true)}
          className={commentOpen ? "" : "mt-2.5"}
        />
      )}
    </StyledPhone>
  );
};

const StyledPhone = styled.div`
  .phones {
    margin-top: 8px;
  }
`;
