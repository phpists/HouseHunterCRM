import { styled } from "styled-components";

export const Spinner = ({ className }) => (
  <StyledSpinner className={`${className}`}>
    <div className="loadingio-spinner-rolling-ezjw0rgtco">
      <div className="ldio-2kd6h4o0a6">
        <div></div>
      </div>
    </div>
  </StyledSpinner>
);

const StyledSpinner = styled.div`
  height: 40px;
  @keyframes ldio-2kd6h4o0a6 {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  .ldio-2kd6h4o0a6 div {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 8px solid #676767;
    border-top-color: transparent;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
  .ldio-2kd6h4o0a6 div {
    animation: ldio-2kd6h4o0a6 1s linear infinite;
  }
  .loadingio-spinner-rolling-ezjw0rgtco {
    width: 40px;
    height: 40px;
    display: inline-block;
  }
  .ldio-2kd6h4o0a6 {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-2kd6h4o0a6 div {
    box-sizing: content-box;
  }
`;
