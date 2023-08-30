import { styled } from "styled-components";

export const ClosedButton = () => (
  <StyledClosedButton>Ведення клієнта закрито</StyledClosedButton>
);

const StyledClosedButton = styled.div`
  border-radius: 14px;
  border: 1.6px solid #ea2c2c;
  background: rgba(255, 255, 255, 0.1);
  padding: 13px 10px 12px;
  color: #ff5959;
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  width: 100%;
  cursor: pointer;
`;
