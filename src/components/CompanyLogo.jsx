import styled from "styled-components";
import { ReactComponent as OfficeIcon } from "../assets/images/office.svg";
import { NavLink, useNavigate } from "react-router-dom";

export const CompanyLogo = ({ value, onEdit }) => {
  const navigate = useNavigate();

  return (
    <StyledCompanyLogo
      className="flex justify-center items-center cursor-pointer"
      value={value}
      onClick={() => (onEdit ? null : navigate("/company"))}
    >
      {value ? null : <OfficeIcon />}
      {onEdit ? (
        <input
          type="file"
          value=""
          onChange={(e) => onEdit(e.target.files[0])}
        />
      ) : null}
    </StyledCompanyLogo>
  );
};

const StyledCompanyLogo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  background: url(${({ value }) => value}) center/cover no-repeat, #4f4f4f;
  transition: all 0.3s;
  border: 1px solid transparent;
  position: relative;
  input {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    z-index: 10;
  }
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
