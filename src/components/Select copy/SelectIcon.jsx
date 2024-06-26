import { styled } from "styled-components";

export const SelectIcon = ({ Icon }) => (
  <StyledSelectIcon className="flex items-center justify-center select-icon">
    <Icon />
  </StyledSelectIcon>
);

const StyledSelectIcon = styled.div`
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--bg-10);
  margin-right: 8px;
  transition: all 0.3s;
`;
