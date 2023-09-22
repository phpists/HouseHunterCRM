import styled from "styled-components";
import { Option } from "./Option";

export const List = () => (
  <StyledList className="hide-scroll">
    <Option />
    <Option />
    <Option />
    <Option />
    <Option />
    <Option />
    <Option />
  </StyledList>
);

const StyledList = styled.div`
  max-height: 200px;
  overflow: auto;
`;
