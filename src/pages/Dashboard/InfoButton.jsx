import styled from "styled-components";
import { ReactComponent as Icon } from "../../assets/images/activity.svg";

export const InfoButton = ({ className }) => (
  <StyledInfoButton className={`flex items-center ${className}`}>
    <Icon />
    Слідкуйте за оновленнями
  </StyledInfoButton>
);

const StyledInfoButton = styled.div`
  padding: 20px;
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  color: var(--dark-90);
  text-align: center;
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: normal;
  letter-spacing: 0.36px;
  svg {
    margin-right: 8px;
    height: 24px;
    width: 24px;
  }
`;
