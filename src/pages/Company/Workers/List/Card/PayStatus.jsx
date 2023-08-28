import { styled } from "styled-components";

export const PayStatus = ({ status }) => (
  <StyledPayStatus status={status}>
    <div className="title">
      {!status ? (
        "Потребує оплати"
      ) : (
        <>
          <span>Сплачено до</span> 28.07.2023
        </>
      )}
    </div>
    <div className="subtitle">Білінг</div>
  </StyledPayStatus>
);

const StyledPayStatus = styled.div`
  padding: 7px 10px 6px;
  width: 100%;
  border-radius: 9px;
  transition: all 0.3s;
  text-align: left;
  cursor: pointer;
  .title {
    color: ${({ status }) => (status ? "#50F835" : "#ff5151")};
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  span {
    color: rgba(80, 248, 53, 0.6);
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover {
    background: ${({ status }) =>
      status ? "rgba(255,255,255,0.05)" : "#FF43431A"};
  }
`;
