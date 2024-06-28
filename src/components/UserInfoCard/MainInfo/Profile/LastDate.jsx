import styled from "styled-components";
import timer from "../../../../assets/images/time.svg";

export const LastDate = ({ data }) => (
  <StyledLastDate className="flex items-center">
    <img src={timer} alt="" />
    Остання активність {data}
  </StyledLastDate>
);

const StyledLastDate = styled.div`
  color: var(--main-color);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
  margin-bottom: 10px;
  img {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`;
