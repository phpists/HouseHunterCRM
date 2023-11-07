import styled from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { useState } from "react";

export const ShowMore = ({ clientId, id }) => {
  const [isFocusedBtn, setIsFocusedBtn] = useState(false);

  return (
    <StyledShowMore isFocusedBtn={isFocusedBtn}>
      <Button onChangeFocus={(val) => setIsFocusedBtn(val)} />
      <Dropdown clientId={clientId} id={id} />
    </StyledShowMore>
  );
};

const StyledShowMore = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  ${({ isFocusedBtn }) =>
    isFocusedBtn &&
    `
   .dropdown {
      opacity: 1;
      visibility: visible;
    }
`}
`;
