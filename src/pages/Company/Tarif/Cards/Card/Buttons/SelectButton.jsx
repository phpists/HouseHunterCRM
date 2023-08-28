import { styled } from "styled-components";
import { Button } from "../../../../../../components/Button";

export const SelectButton = ({ onSelect }) => (
  <StyledSelectButton onClick={onSelect}>
    <Button title="Обрати" outline="true" className="select-btn" />
  </StyledSelectButton>
);

const StyledSelectButton = styled.div`
  .select-btn {
    padding: 7px 17px 5px;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    height: 26px;
    flex-shrink: 0;
    border-radius: 6px;
    border: 1.2px solid #fff;
  }
`;
