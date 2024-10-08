import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Name = ({ name, id }) => (
  <StyledName title={name} to={`/client/${id}`}>
    {name}
  </StyledName>
);

const StyledName = styled(NavLink)`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  max-width: 80px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
`;
