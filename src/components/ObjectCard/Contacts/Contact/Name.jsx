import styled from "styled-components";

export const Name = ({
  type,
  name = "-",
  typeText,
  subtitle,
  onClickOnSubtitle,
}) => (
  <StyledName type={type} isError={typeText === "ШАХРАЙ"}>
    <div className="name" title={name}>
      {name?.replaceAll("&amp;#039;", "'")}
    </div>
    <div
      className="role"
      title={typeText ? typeText : type === "owner" ? "Власник" : "Наш Рієлтор"}
    >
      {typeText ? typeText : type === "owner" ? "Власник" : "Наш Рієлтор"}
    </div>
    {subtitle ? (
      <div className="subtitle" onClick={onClickOnSubtitle}>
        {subtitle}
      </div>
    ) : null}
  </StyledName>
);

const StyledName = styled.div`
  margin-bottom: 8px;
  .name {
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 2px;
    color: ${({ type, isError }) =>
      isError ? "#f94343" : type === "owner" ? "#2FA112" : "var(--main-color)"};
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .role {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    opacity: 0.4;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 170px;
    overflow: hidden;
  }
  .subtitle {
    display: flex;
    align-items: center;
    padding: 1px 6px 2px 6px;
    border-radius: 5px;
    background: rgba(88, 175, 255, 0.3);
    color: #58afff;
    font-family: Open Sans;
    font-size: 10px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 1;
    letter-spacing: 0.22px;
    height: 18px;
    white-space: nowrap;
    justify-content: center;
    font-size: 10px;
    opacity: 1;
    margin-top: 5px;
  }
`;
