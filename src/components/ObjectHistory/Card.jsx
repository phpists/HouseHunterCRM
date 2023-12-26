import styled from "styled-components";
import deleteIcon from "../../assets/images/delete-history.svg";
import checkIcon from "../../assets/images/check-history.svg";

export const Card = ({ title, date, hours, tagName, action }) => (
  <>
    <div className="icon">
      <img src={action ? checkIcon : deleteIcon} alt="" />
    </div>
    <StyledCard action={action}>
      <div className="history-card-title">{title}</div>
      {/* <div className="history-card-date">
        <div>{date}</div>
        <span>{hours}</span>
      </div> */}
      <div className="history-card-footer">
        <div className="history-card-status">
          {action ? "Додав тег:" : "Видалив тег:"}
        </div>
        <span className="history-card-tagName">{tagName}</span>
      </div>
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
    &-footer {
      display: flex;
      align-items: center;
    }
    &-status {
      color: ${({ action }) => (action ? "#50f835" : "#F14040")};
      font-family: Overpass;
      font-size: 14px;
      font-style: normal;
      font-weight: 200;
      line-height: 120%;
      margin-right: 10px;
    }
    &-tagName {
      color: #fff;
      font-size: 14px;
      font-style: normal;
      font-weight: 100;
      line-height: 120%; /* 16.8px */
    }
  }
`;
