import { styled } from "styled-components";

export const SendClientButton = () => (
  <StyledSendClientButton>Делегувати</StyledSendClientButton>
);

const StyledSendClientButton = styled.div`
  color: var(--main-color);
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  padding: 8px 18px 6px 17px;
  border-radius: 8px;
  border: 1.4px solid var(--second-color);
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 21px;
  &:hover {
    background: var(--bg-20);
    opacity: 1;
    border: 1px solid transparent;
  }
  @media (max-width: 800px) {
    font-size: 13px;
    padding: 8px 14px;
    margin-right: 15px;
  }
  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;
