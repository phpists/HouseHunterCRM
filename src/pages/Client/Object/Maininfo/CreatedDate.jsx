import { styled } from "styled-components";

export const CreatedDate = ({ date, deadline }) => (
  <StyledCreatedDate>
    <div className="title">{deadline ?? date}</div>
    <div className="subtitle">
      {/* Дата дедлайну */}
      {deadline ? "Дата дедлайну" : "Коли додана"}
    </div>
  </StyledCreatedDate>
);

const StyledCreatedDate = styled.div`
  padding: 7px 10px 6px;
  border-radius: 9px;
  transition: all 0.3s;
  .title {
    color: var(--main-color);
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
