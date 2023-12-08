import styled from "styled-components";

export const Role = ({ role, roleColor, roleBg }) => (
  <StyledRole
    roleColor={roleColor}
    roleBg={roleBg}
    className="flex items-center justify-center"
  >
    {role}
  </StyledRole>
);

const StyledRole = styled.div`
  padding: 4px 6px;
  height: 20px;
  border-radius: 4px;
  background: ${({ roleBg }) => roleBg};
  color: ${({ roleColor }) => roleColor};
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 100;
  line-height: 1; /* 12.98px */
  letter-spacing: 0.22px;
`;
