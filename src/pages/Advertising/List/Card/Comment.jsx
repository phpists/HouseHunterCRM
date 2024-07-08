import styled from "styled-components";

export const Comment = () => (
  <StyledComment>
    <div className="value">Почніть писати</div>
    <div className="label">Коментар</div>
  </StyledComment>
);

const StyledComment = styled.div`
  background: var(--card-bg-3);
  border-radius: 6px;
  height: 60px;
  min-width: 204px;
  padding: 9px 8px 11px;
  .value {
    font-size: 14px;
    font-weight: var(--font-weight-100);
    line-height: 16.52px;
    letter-spacing: 0.02em;
    text-align: left;
    margin-bottom: 7px;
  }
  .label {
    font-size: 11px;
    font-weight: var(--font-weight-200);
    line-height: 14.98px;
    letter-spacing: 0.02em;
    text-align: left;
    opacity: var(--opacity-light);
  }
  @media (max-width: 1200px) {
    width: 100%;
  }
`;
