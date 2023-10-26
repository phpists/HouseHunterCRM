import styled from "styled-components";

export const Name = ({ type, name = "-" }) => (
  <StyledName type={type}>
    <div className="name">{name}</div>
    <div className="role">{type === "owner" ? "Власник" : "Наш Рієлтор"}</div>
  </StyledName>
);

const StyledName = styled.div`
  .name {
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 2px;
    color: ${({ type }) => (type === "owner" ? "#2FA112" : "#FFF")};
  }
  .role {
    color: #fff;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    opacity: 0.4;
  }
`;
