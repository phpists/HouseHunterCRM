import { styled } from "styled-components";
import { formatNumber } from "../../../utilits";

export const Card = ({ type, time, price }) => (
  <StyledCard className="flex items-center justify-between" type={type}>
    <div>
      <div className="title flex items-center">
        <span>Рахунок</span>
      </div>
      <div className="subtitle">{time ?? "-"}</div>
    </div>
    <div className="price">{formatNumber(Number(price ?? 0))}₴</div>
  </StyledCard>
);

const StyledCard = styled.div`
  padding: 7px 18px 6px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  cursor: pointer;
  .title {
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%;
    letter-spacing: 0.3px;
    color: ${({ type }) => (type ? "var(--main-color)" : "#FF5151")};
    span {
      opacity: 0.6;
      margin-right: 3px;
    }
  }
  .subtitle {
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .price {
    color: ${({ type }) => (type ? "var(--green-light-2)" : "#FF5151")};
    text-align: right;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  &:hover {
    background: ${({ type }) =>
      type ? "rgba(255,255,255, 0.05)" : "rgba(255, 67, 67, 0.10)"};
  }
`;
