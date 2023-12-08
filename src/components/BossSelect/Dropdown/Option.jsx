import styled from "styled-components";
import img from "../../../assets/images/profile-avatar.svg";
import { Role } from "./Role";
import { ReactComponent as CheckIcon } from "../../../assets/images/circle-green-check.svg";

export const Option = ({
  name,
  role,
  roleColor,
  roleBg,
  last,
  active,
  onClick,
}) => (
  <StyledOption
    roleColor={roleColor}
    avatar={img}
    last={last}
    className="flex items-center"
    onClick={onClick}
    active={active}
  >
    {/* <div className="avatar" /> */}
    <div className="name">{name}</div>
    <Role role={role} roleColor={roleColor} roleBg={roleBg} />
    <CheckIcon />
  </StyledOption>
);

const StyledOption = styled.div`
  padding: 8px;
  transition: all 0.3s;
  cursor: pointer;
  ${({ last }) => !last && "border-bottom: 1px solid rgba(255, 255, 255, 0.1);"}
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 24px;
    border: 1px solid ${({ roleColor }) => roleColor};
    background: url(${({ avatar }) => avatar}) center/cover no-repeat;
    margin-right: 8px;
  }
  .name {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-right: 8px;
  }
  svg {
    display: block;
    margin-left: auto;
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: all 0.3s;
  }
  path {
    fill: ${({ active }) => (active ? "#50F835" : "#FFF")};
  }

  &:hover {
    background: ${({ active }) =>
      active ? "rgba(80, 248, 53, 0.10)" : "rgba(255, 255, 255, 0.10)"};
    svg {
      opacity: 1;
    }
  }
`;
