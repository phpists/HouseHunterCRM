import styled from "styled-components";

export const Tag = ({ procent }) => <StyledTag>+{procent}%</StyledTag>;

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ef9933;
  padding: 2px 3px;
  font-family: "Open sans", sans-serif;
  font-size: 9px;
  color: #ef9933;
  font-weight: 600;
  background: rgba(239, 153, 51, 0.2);
  margin-right: 6px;
  border-radius: 8px;
  line-height: 1;
  height: 16px;
  margin-bottom: 18px;
`;
