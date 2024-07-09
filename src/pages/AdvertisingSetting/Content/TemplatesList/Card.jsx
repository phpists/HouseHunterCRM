import styled from "styled-components";

export const Card = () => (
  <StyledCard className="flex items-center justify-between">
    <div>
      <div className="value">Реклама OLX test</div>
      <div className="subtitle">Назва</div>
    </div>
    <div>
      <div className="value">OLX</div>
      <div className="subtitle">Майданчик</div>
    </div>
    <div className="right">
      <div className="value">05.06.2024</div>
      <div className="subtitle">Дата створення</div>
    </div>
  </StyledCard>
);

const StyledCard = styled.div`
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.3s;

  .value {
    font-size: 14px;
    font-weight: var(--font-weight-200);
    line-height: 16.52px;
    letter-spacing: 0.02em;
    text-align: left;
    margin-bottom: 2px;
  }
  .subtitle {
    font-size: 11px;
    font-weight: var(--font-weight-200);
    line-height: 14.98px;
    letter-spacing: 0.02em;
    text-align: left;
    opacity: var(--opacity-light);
  }
  .right {
    text-align: right;
  }
  @media (max-width: 800px) {
    .value {
      font-size: 11px;
    }
    .subtitle {
      font-size: 8px;
    }
  }
`;
