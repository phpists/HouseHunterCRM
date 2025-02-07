import styled from "styled-components";

export const Card = ({
  selected,
  onSelect,
  last,
  olxAuth,
  name,
  realestateStatus,
  flombuAuth,
  rieltorAuth,
}) => (
  <StyledCard
    className={`flex items-center justify-between ${selected && "active"}`}
    onClick={onSelect}
    last={last}
  >
    {/* <div>
      <div className="value">Реклама OLX test</div>
      <div className="subtitle">Назва</div>
    </div> */}
    <div>
      <div className="value">{name}</div>
      <div className="subtitle">Майданчик</div>
    </div>
    <div className="right">
      <div
        className={`value ${
          (
            name === "olx"
              ? olxAuth
              : name === "realestate"
              ? realestateStatus
              : name === "flombu"
              ? flombuAuth
              : name === "rieltor"
              ? rieltorAuth
              : false
          )
            ? "active"
            : "notActive"
        }`}
      >
        {name === "olx"
          ? olxAuth
            ? "Авторизовано"
            : "Не авторизовано"
          : name === "realestate"
          ? realestateStatus
            ? "Авторизовано"
            : "Не авторизовано"
          : name === "flombu"
          ? flombuAuth
            ? "Авторизовано"
            : "Не авторизовано"
          : name === "rieltor"
          ? rieltorAuth
            ? "Авторизовано"
            : "Не авторизовано"
          : "Не авторизовано"}
      </div>
      <div className="subtitle">Авторизація</div>
    </div>
  </StyledCard>
);

const StyledCard = styled.div`
  padding: 6.5px 10px;
  cursor: pointer;
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
    &.notActive {
      color: red;
    }
    &.active {
      color: var(--green);
    }
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

  &.active {
    background: var(--company-filter-dropdown-bg);
    border: none;
    border-radius: 10px;
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
