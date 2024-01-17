import { styled } from "styled-components";

export const Text = ({ title, paying, dayCount }) => (
  <StyledText paying={paying}>
    <div className="title-wrapper">
      <div className="title">{title}</div>
      <div className="title success">Кошти успішно списані!</div>
    </div>
    <div className="subtitle">+{dayCount} календарних днів</div>
  </StyledText>
);

const StyledText = styled.div`
  .title-wrapper {
    position: relative;
  }
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 118%; /* 20.06px */
    letter-spacing: 0.34px;
    margin-bottom: 2px;
    transition: all 0.5s;
    opacity: ${({ paying }) => (paying ? 0 : 1)};
    transform: translateX(${({ paying }) => (paying ? -10 : 0)}px);
    &.success {
      color: #81fb21;
      position: absolute;
      top: 0;
      width: max-content;
      opacity: ${({ paying }) => (paying ? 1 : 0)};
      visibility: ${({ paying }) => (paying ? "visible" : "hidden")};
      transform: translateX(${({ paying }) => (paying ? 0 : 10)}px);
      transition: all 0.5s;
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
    opacity: 0.4;
  }
`;
