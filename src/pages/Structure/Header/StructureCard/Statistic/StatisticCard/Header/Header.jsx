import styled from "styled-components";
import { Icon } from "./Icon";

export const Header = ({ title, subtitle, icon, iconBg }) => (
  <StyledHeader className="flex items-center">
    <Icon icon={icon} iconBg={iconBg} />
    <div>
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
    </div>
  </StyledHeader>
);

const StyledHeader = styled.div`
  border-radius: 6px;
  background: #3d3d3d;
  padding: 4px;
  margin-bottom: 10px;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%;
    letter-spacing: 0.3px;
    margin-bottom: 2px;
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
