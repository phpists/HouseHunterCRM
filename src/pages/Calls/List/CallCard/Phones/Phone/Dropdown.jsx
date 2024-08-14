import styled from "styled-components";

export const Dropdown = ({
  callsData,
  telegram,
  onChangeHistoryOrderStatus,
}) => (
  <StyledDropdown>
    {callsData?.map(({ dt_incoming, id, status }, i) => (
      <div className="item" key={i}>
        <span>{dt_incoming?.split(" ")[0] ?? "-"}</span>
        <div className="flex items-center">
          <span>{dt_incoming?.split(" ")[1] ?? "-"}</span>
          {telegram ? (
            <button
              onClick={() =>
                status === "1" ? null : onChangeHistoryOrderStatus(id)
              }
            >
              {status === "1" ? "Опрацьовано" : "Не опрацьовано"}
            </button>
          ) : null}
        </div>
      </div>
    ))}
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  width: 360px;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  border-radius: 0 0 9px 9px;
  overflow: hidden;
  z-index: 2;
  span {
    color: var(--white-color);
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 31px 6px 15px;
    background: var(--bg-80);
    border-bottom: 1px solid var(--bg-10);
    button {
      font-family: Overpass;
      font-size: 11px;
      font-style: normal;
      font-weight: var(--font-weight-light);
      line-height: 1.5;
      letter-spacing: 0.3px;
      padding: 5px;
      flex-shrink: 1;
      background: var(--bg-60);
      color: #2c2c2c;
      border-radius: 5px;
      width: 100px;
      margin-left: 10px;
      &:hover {
        background: var(--color-2);
      }
    }
  }

  @media (max-width: 1600px) {
    width: 100%;
  }
`;
