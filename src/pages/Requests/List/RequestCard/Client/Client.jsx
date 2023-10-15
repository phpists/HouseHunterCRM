import styled from "styled-components";
import { Step } from "./Step";
import { Info } from "./Info";
import { Phones } from "../../../../../components/Phones/Phones";

export const Client = () => {
  return (
    <StyledClient className="clickable">
      <Step />
      <Info />
      <Phones classNameContent="phones-wrapper" />
    </StyledClient>
  );
};

const StyledClient = styled.div`
  @media (max-width: 1399.9px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: start;
    .phones-wrapper {
      width: 100%;
    }
  }
  @media (min-width: 1400px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
