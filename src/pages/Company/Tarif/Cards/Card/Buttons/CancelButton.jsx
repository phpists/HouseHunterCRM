import { styled } from "styled-components";
import { Button } from "../../../../../../components/Button";

export const CancelButton = ({ onCancel }) => (
  <StyledCancelButton onClick={onCancel}>
    <Button title="Відмінити" outline="true" className="cancel-btn" />
  </StyledCancelButton>
);

const StyledCancelButton = styled.div`
  margin-right: 14px;
  .cancel-btn {
    padding: 7px 17px 5px;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    height: 26px;
    flex-shrink: 0;
    border-radius: 6px;
    border: 1.2px solid #fff;
    &:hover {
      color: #f82727;
    }
  }
`;
