import { styled } from "styled-components";

export const Toggle = ({ value, onChange, className }) => (
  <StyledToggle value={value} onClick={onChange} className={`${className}`}>
    <div />
  </StyledToggle>
);

const StyledToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ value }) => (value ? "flex-end" : "flex-start")};
  width: 34px;
  height: 19px;
  background: ${({ value }) => (value ? "#7B80FF" : "rgba(0, 0, 0, 0.16)")};
  padding: 1px 2px;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;
  flex-shrink: 0;
  div {
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: #fff;
    transition: all 0.3s;
  }
`;
