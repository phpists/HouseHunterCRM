import { styled } from "styled-components";
import { Bar } from "./Bar";
import { Size } from "./Size";

export const LoadingBar = ({ totalSize, loadedSize }) => (
  <StyledLoadingBar className="flex items-center">
    <Bar procent={(loadedSize / totalSize) * 100} />
    <Size totalSize={totalSize} loadedSize={loadedSize} />
  </StyledLoadingBar>
);

const StyledLoadingBar = styled.div`
  margin-top: 9px;
`;
