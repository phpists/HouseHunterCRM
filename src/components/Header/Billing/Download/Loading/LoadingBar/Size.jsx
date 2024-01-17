import { styled } from "styled-components";

export const Size = ({ totalSize, loadedSize }) => (
  <StyledSize className="flex items-center">
    {loadedSize} <div className="divider">/</div> <span>{totalSize}</span>
  </StyledSize>
);

const StyledSize = styled.div`
  color: #5d63ff;
  text-align: right;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.22px;
  width: max-content;
  word-wrap: now;
  flex-shrink: 0;
  .divider {
    color: rgba(93, 99, 255, 0.2);
  }
  span {
    color: rgba(93, 99, 255, 0.4);
  }
`;
