import styled from "styled-components";

export const Card = ({ expireAt, email, id, name }) => (
  <StyledCard className={`flex items-center justify-between`}>
    <div>
      <div className="value">{expireAt}</div>
      <div className="subtitle">Авторизація дійсна до</div>
    </div>
    {email?.length > 0 ? (
      <div>
        <div className="value">{email}</div>
        <div className="subtitle">Email</div>
      </div>
    ) : null}
    <div>
      <div className="value">{id}</div>
      <div className="subtitle">Id</div>
    </div>
    {name?.length > 0 ? (
      <div>
        <div className="value">{name}</div>
        <div className="subtitle">Ім'я</div>
      </div>
    ) : null}
  </StyledCard>
);

const StyledCard = styled.div`
  padding: 6.5px 10px;
  transition: all 0.3s;
  border-bottom: 1px solid var(--company-filter-dropdown-bg);
  border-radius: 0;
  ${({ last }) => last && "border: none;"}
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
