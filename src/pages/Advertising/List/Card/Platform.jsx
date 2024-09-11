import styled from "styled-components";
import logo from "../../../../assets/images/olx.png";
import logo2 from "../../../../assets/images/realstate-icon.png";

export const Platform = ({ title, resource }) => (
  <StyledPlatform
    className="flex items-center"
    logo={resource === "4" ? logo2 : resource === "1" ? logo : ""}
  >
    <div></div>
    <span>{title}</span>
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
