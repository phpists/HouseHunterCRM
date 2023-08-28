import { styled } from "styled-components";

export const Card = ({ type }) => (
  <StyledCard className="flex items-center justify-between" type={type}>
    <div>
      <div className="title">Рахунок №2139Q87</div>
      <div className="subtitle">6 травня 2023 14:58</div>
    </div>
    <div className="price">1 000₴</div>
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
    font-weight: 300;
    line-height: 118%;
    letter-spacing: 0.3px;
    color: ${({ type }) => (type ? "#FFF" : "#FF5151")};
    span {
      opacity: 0.6;
    }
  }
  .subtitle {
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .price {
    color: ${({ type }) => (type ? "#50F835" : "#FF5151")};
    text-align: right;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  &:hover {
    background: ${({ type }) =>
      type ? "rgba(255,255,255, 0.05)" : "rgba(255, 67, 67, 0.10)"};
  }
`;
