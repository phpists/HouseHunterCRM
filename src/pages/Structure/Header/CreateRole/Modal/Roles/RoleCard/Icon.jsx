import styled from "styled-components";

export const Icon = ({ IconImg, iconBg, iconColor }) => (
  <StyledIcon
    className="flex items-center justify-center"
    iconBg={iconBg}
    iconColor={iconColor}
  >
    <IconImg />
  </StyledIcon>
);

const StyledIcon = styled.div`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  margin-right: 14px;
  border-radius: 4px;
  background: ${({ iconBg }) => iconBg};
  path {
    fill: ${({ iconColor }) => iconColor};
  }
`;
