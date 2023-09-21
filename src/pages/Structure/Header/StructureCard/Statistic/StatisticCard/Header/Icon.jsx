import styled from "styled-components";

export const Icon = ({ icon, iconBg }) => (
  <StyledIcon className="flex items-center justify-center" iconBg={iconBg}>
    <img src={icon} alt="" />
  </StyledIcon>
);

const StyledIcon = styled.div`
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 4px;
  margin-right: 13px;
  background: ${({ iconBg }) => iconBg};
`;
