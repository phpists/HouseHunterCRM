import styled from "styled-components";
import { Price } from "../../Price/Price";
import { Tags } from "./Tags/Tags";

export const MainInfo = () => {
  return (
    <StyledMainInfo>
      <Price />
      <Tags />
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  padding: 10px;
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.8);
  min-height: 200px;
  margin-right: 10px;
  width: 220px;
  height: 32px;
`;
