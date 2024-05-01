import { styled } from "styled-components";
import armIcon from "../../../../assets/images/arm-emoji.png";

export const PhoneInfo = ({ agent, agentPhone }) => (
  <StyledPhoneInfo className="flex items-start">
    <div>
      <div className="name" title={agent?.full_name ?? "-"}>
        {agent?.full_name ?? "-"}
      </div>
      <div className="phone">{agentPhone}</div>
    </div>
    <img src={armIcon} alt="" />
  </StyledPhoneInfo>
);

const StyledPhoneInfo = styled.div`
  padding: 7px 7px 6px 8px;
  border-radius: 6px;
  background: var(--card-bg-4);
  cursor: pointer;
  transition: all 0.3s;
  flex-shrink: 0;
  width: 163px;
  .name {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100px;
    height: 1.2em;
    white-space: nowrap;
  }
  .phone {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }

  img {
    margin-left: 29px;
    flex-shrink: 0;
  }
  &:hover {
    background: var(--hover-card-3);
  }
  @media (max-width: 1400px) {
    width: 100%;
    flex-shrink: 1;
    justify-content: space-between;
    height: 47px;
    .name {
      font-size: 14px;
    }
  }
`;
