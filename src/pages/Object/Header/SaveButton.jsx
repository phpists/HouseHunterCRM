import { styled } from "styled-components";

export const SaveButton = () => (
  <StyledSaveButton>Зберігти зміни</StyledSaveButton>
);

const StyledSaveButton = styled.div`
  color: #fff;
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  padding: 8px 30px 6px 28px;
  border-radius: 8px;
  border: 1.4px solid rgba(255, 255, 255, 0.4);
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    opacity: 1;
    border: 1px solid transparent;
  }
`;
