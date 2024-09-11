import styled from "styled-components";
import { CheckOption } from "../../../CheckOption";

export const Card = ({ icon, title, active, onClick, onChangeActiveTab }) => (
  <StyledCard icon={icon}>
    <CheckOption
      onlyCheck
      small
      value={active ? "1" : "0"}
      onChange={onClick}
    />
    <div className="card-content flex items-center" onClick={onChangeActiveTab}>
      <div></div>
      <span>{title}</span>
    </div>
  </StyledCard>
);

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 17px 1fr;
  gap: 15px;
  align-items: center;
  cursor: pointer;
  .card-content {
    background: var(--second-bg);
    padding: 10px;
    border-radius: 6px;
    gap: 10px;
    font-size: 14px;
    line-height: 16.8px;
    font-weight: var(--font-weight-200);
    color: var(--color-2);
    div {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background: url(${({ icon }) => icon}) center/cover no-repeat;
    }
  }
`;
