import { styled } from "styled-components";

export const Bar = ({ procent }) => (
  <StyledBar className="flex items-center" procent={procent}>
    <div />
  </StyledBar>
);

const StyledBar = styled.div`
  width: 140px;
  height: 6px;
  flex-shrink: 0;
  background: rgba(93, 99, 255, 0.1);
  padding: 1px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  margin-right: 10px;
  div {
    position: absolute;
    left: 1px;
    top: 50%;
    transform: translateY(-50%);
    height: 4px;
    transition: all 0.3s;
    width: calc(${({ procent }) => procent}% - 2.5px);
    background: #5d63ff;
    border-radius: 6px;
  }
`;
