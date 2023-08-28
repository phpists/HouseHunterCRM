import styled from "styled-components";
import { ReactComponent as OfficeIcon } from "../assets/images/office.svg";
import { NavLink } from "react-router-dom";

export const CompanyLogo = () => (
  <StyledCompanyLogo
    className="flex justify-center items-center cursor-pointer"
    to="/company"
  >
    <OfficeIcon />
  </StyledCompanyLogo>
);

const StyledCompanyLogo = styled(NavLink)`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  background: #4f4f4f;
  transition: all 0.3s;
  border: 1px solid transparent;
  g {
    transition: all 0.3s;
  }
  &:hover {
    border: 1px solid #fff;
    g {
      opacity: 1;
    }
  }
`;
