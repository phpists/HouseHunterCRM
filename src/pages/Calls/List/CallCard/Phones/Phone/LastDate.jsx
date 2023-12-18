import styled from "styled-components";

export const LastDate = ({ date }) => (
  <StyledLastDate>
    <div className="date">{date}</div>
    <div className="subtitle">Остання активність</div>
  </StyledLastDate>
);

const StyledLastDate = styled.div`
  .date {
    color: rgba(255, 255, 255, 0.6);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%;
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
`;
