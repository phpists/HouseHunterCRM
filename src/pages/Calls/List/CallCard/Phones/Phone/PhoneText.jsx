import styled from "styled-components";

export const PhoneText = ({ phone, clientName }) => (
  <StyledPhoneText clientName={clientName}>
    <div className="phone">{phone}</div>
    <div className="subtitle" title={clientName ?? "Відсутній в базі"}>
      {clientName ?? "Відсутній в базі"}
    </div>
  </StyledPhoneText>
);

const StyledPhoneText = styled.div`
  margin-right: 27px;
  .phone {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 2px;
  }
  .subtitle {
    color: ${({ clientName }) =>
      clientName ? "var(--main-color)" : "#d0a0ff"};
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 1;
    letter-spacing: 0.22px;
    opacity: 0.4;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${({ clientName }) =>
      !clientName &&
      `
        padding: 4px 6px;
    height: 20px;
    border-radius: 4px;
    background: #d0a0ff40;
    color: #d0a0ff;
    opacity: 1;
    `}
  }
`;
