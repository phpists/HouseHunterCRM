import { styled } from "styled-components";

export const Selected = ({ payCount, tarifPrice }) => (
  <StyledSelected>
    <div className="title">+{payCount} місяць</div>
    <div className="subtitle">{tarifPrice * payCount}₴</div>
  </StyledSelected>
);

const StyledSelected = styled.div`
  padding: 7px 10px 6px;
  width: 100%;
  border-radius: 9px;
  transition: all 0.3s;
  cursor: pointer;
  text-align: left;
  .title {
    color: var(--green-light-2);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .subtitle {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover {
    background: var(--card-bg-2);
  }
`;
