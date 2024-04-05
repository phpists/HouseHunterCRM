import styled from "styled-components";

export const Card = ({ title, date }) => (
  <>
    <StyledCard>
      <div className="history-card-title">{title}</div>
      {date ? (
        <div className="history-card-date">
          <div>{date}</div>
          {/* <span>{hours}</span> */}
        </div>
      ) : null}
    </StyledCard>
  </>
);

const StyledCard = styled.div`
  font-family: Overpass;

  .history-card {
    &-title {
      color: #fff;
      font-size: 14px;
      font-style: normal;
      font-weight: 100;
      line-height: 120%; /* 16.8px */
      margin-bottom: 4px;
    }
    &-date {
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      font-style: normal;
      font-weight: 100;
      line-height: 120%;
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      span {
        margin-left: 10px;
      }
    }
  }
`;
