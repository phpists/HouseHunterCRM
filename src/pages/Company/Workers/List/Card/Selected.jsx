import { styled } from "styled-components";

export const Selected = () => (
  <StyledSelected>
    <div className="title">+1 місяць</div>
    <div className="subtitle">1 000₴</div>
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
    color: #50f835;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
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
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;
