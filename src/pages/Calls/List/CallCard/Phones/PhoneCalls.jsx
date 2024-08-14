import styled from "styled-components";
import { ReactComponent as Phone } from "../../../../../assets/images/small-phone.svg";
import { ReactComponent as Arrow } from "../../../../../assets/images/call-arrow.svg";

export const PhoneCalls = ({ count = 0, telegram }) => (
  <StyledPhoneCalls className="flex items-center">
    <div>
      <div className="flex items-center title">
        <Phone />
        {telegram ? "Історія" : count}
      </div>
      <div className="subtitle">Викликів</div>
    </div>
    <Arrow className="arrow-down" />
  </StyledPhoneCalls>
);

const StyledPhoneCalls = styled.div`
  width: 100px;
  padding: 10px;
  border-radius: 9px;
  background: var(--bg-80);
  height: max-content;
  height: 60px;
  .title {
    color: var(--main-color);
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 2px;
    svg {
      margin-right: 6px;
    }
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
  .arrow-down {
    height: 24px;
    width: 24px;
    margin-left: 10px;
  }

  @media (min-width: 1400px) {
    .arrow-down {
      display: none;
    }
  }
`;
