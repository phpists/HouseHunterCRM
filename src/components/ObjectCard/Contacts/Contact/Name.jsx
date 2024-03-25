import styled from "styled-components";

export const Name = ({ type, name = "-", typeText }) => (
  <StyledName type={type}>
    <div className="name" title={name}>
      {name}
    </div>
    <div
      className="role"
      title={typeText ? typeText : type === "owner" ? "Власник" : "Наш Рієлтор"}
    >
      {typeText ? typeText : type === "owner" ? "Власник" : "Наш Рієлтор"}
    </div>
  </StyledName>
);

const StyledName = styled.div`
  margin-bottom: 8px;
  .name {
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 2px;
    color: ${({ type }) => (type === "owner" ? "#2FA112" : "#FFF")};
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 170px;
    overflow: hidden;
  }
`;
