import styled from "styled-components";
import checkIcon from "../../../../assets/images/welcome-step-checkbox.svg";

export const Checkbox = ({ value, onChange }) => (
  <StyledCheckbox
    className="flex items-center justify-center"
    onClick={onChange}
    value={value}
  >
    <img src={checkIcon} alt="" />
  </StyledCheckbox>
);

const StyledCheckbox = styled.button`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 100%;
  border: 1px solid #fff;
  margin-right: 10px;
  img {
    transition: all 0.3s;
    opacity: ${({ value }) => (value ? 1 : 0)};
  }
`;
