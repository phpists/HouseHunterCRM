import { styled } from "styled-components";

export const Count = ({ count }) => <StyledCount>+{count}</StyledCount>;

const StyledCount = styled.div`
  padding: 1px 6px 2px 6px;
  border-radius: 5px;
  background: rgba(88, 175, 255, 0.3);
  color: #58afff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.22px;
`;
