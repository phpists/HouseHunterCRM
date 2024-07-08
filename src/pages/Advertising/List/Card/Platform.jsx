import styled from "styled-components";
import logo from "../../../../assets/images/olx.png";

export const Platform = () => (
  <StyledPlatform className="flex items-center" logo={logo}>
    <div></div>
    <span>olx</span>
  </StyledPlatform>
);

const StyledPlatform = styled.div`
  gap: 10px;
  font-size: 14px;
  font-weight: var(--font-weight-light);
  line-height: 16.8px;
  text-align: left;
  padding: 10px;
  border-radius: 9px;
  background: var(--dark-card-bg);
  div {
    height: 32px;
    width: 32px;
    border-radius: 4px;
    background: url(${({ logo }) => logo}) center/cover no-repeat;
  }
`;
