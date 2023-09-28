import styled from "styled-components";
import icon from "../../assets/images/activity.svg";

export const InfoButton = ({ className }) => (
  <StyledInfoButton className={`flex items-center ${className}`}>
    <img src={icon} alt="" />
    Слідкуйте за оновленнями
  </StyledInfoButton>
);

const StyledInfoButton = styled.div`
  padding: 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  letter-spacing: 0.36px;
  img {
    margin-right: 8px;
    height: 24px;
    width: 24px;
  }
`;
