import styled from "styled-components";

export const PhoneText = ({ phone = "-" }) => (
  <StyledPhoneText>
    <div className="phone">{phone} </div>
    <div className="subtitle">Новий клієнт</div>
  </StyledPhoneText>
);

const StyledPhoneText = styled.div`
  margin-right: 27px;
  .phone {
    color: #fff;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
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
  @media (max-width: 600px) {
    .phone {
      font-size: 13px;
    }
  }
`;
