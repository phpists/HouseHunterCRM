import styled from "styled-components";
import { Step } from "./Step";
import { Info } from "./Info";
import { Phones } from "../../../../../components/Phones/Phones";

export const Client = () => {
  return (
    <StyledClient className="clickable">
      <Step />
      <Info />
      <Phones />
    </StyledClient>
  );
};

const StyledClient = styled.div``;
