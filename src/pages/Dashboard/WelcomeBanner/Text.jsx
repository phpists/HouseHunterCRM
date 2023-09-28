import styled from "styled-components";

export const Text = () => (
  <StyledText>
    <div className="title">Раді вас бачити!</div>
    <div className="subtitle">
      Платформа спростить управління вашими клієнтами та <br /> нерухомістю,
      надаючи вам інструменти для успішного <br /> ведення бізнесу.
    </div>
  </StyledText>
);

const StyledText = styled.div`
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 32px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    letter-spacing: 0.64px;
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.3px;
    opacity: 0.4;
  }
  @media (max-width: 600px) {
    .title {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .subtitle {
      font-size: 14px;
    }
  }
`;
