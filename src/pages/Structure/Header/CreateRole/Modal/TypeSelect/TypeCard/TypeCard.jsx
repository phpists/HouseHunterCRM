import styled from "styled-components";
import { ReactComponent as UserCheckIcon } from "../../../../../../../assets/images/user-check.svg";
import { ReactComponent as UserIcon } from "../../../../../../../assets/images/user-icon.svg";
import React from "react";
import arrowBetween from "../../../../../../../assets/images/structure-arrow.svg";

export const TypeCard = ({ titles, type }) => {
  return (
    <StyledTypeCard className="flex items-center">
      <div className="cards">
        <div>
          <UserCheckIcon />
        </div>
        <div style={{ opacity: type >= 4 ? 1 : 0.2 }}>
          <UserCheckIcon />
        </div>
        <div style={{ opacity: type >= 3 ? 1 : 0.2 }}>
          <UserCheckIcon />
        </div>
        <div style={{ opacity: type >= 2 ? 1 : 0.2 }}>
          <UserIcon />
        </div>
      </div>
      <div>
        <div className="title">
          {titles.map((title, i) => (
            <React.Fragment key={i}>
              <div>{title}</div>
              {i < titles.length - 1 && <img src={arrowBetween} alt="" />}
            </React.Fragment>
          ))}
        </div>
        <div className="subtitle">Підходить якщо ви працюєте самостійно</div>
      </div>
    </StyledTypeCard>
  );
};

const StyledTypeCard = styled.div`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0);
  transition: all 0.3s;
  cursor: pointer;
  .cards {
    display: grid;
    grid-template-columns: 34px 34px;
    grid-template-rows: 34px 34px;
    gap: 3px;
    margin-right: 20px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background: rgba(126, 206, 253, 0.25);
      path {
        fill: #7ecefd;
      }
      &:nth-child(2) {
        background: rgba(89, 216, 230, 0.25);
        path {
          fill: #7ecefd;
        }
      }
      &:nth-child(3) {
        background: rgba(208, 160, 255, 0.25);
        path {
          fill: #d0a0ff;
        }
      }
      &:nth-child(4) {
        background: rgba(177, 255, 145, 0.25);
        path {
          fill: #b1ff91;
        }
      }
      svg {
        height: 20px;
        width: 20px;
        transform: rotate(0deg);
      }
    }
  }
  .title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 6px;
    div {
      color: #fff;
      font-family: Overpass;
      font-size: 11px;
      font-style: normal;
      font-weight: 100;
      line-height: 1; /* 12.98px */
      letter-spacing: 0.22px;
      opacity: 0.8;
    }
    div:nth-child(1) {
      color: #fff;
      font-family: Overpass;
      font-size: 14px;
      font-style: normal;
      font-weight: 100;
      line-height: 118%; /* 16.52px */
      letter-spacing: 0.28px;
      opacity: 1;
    }
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
  }
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.04);
  }
`;
