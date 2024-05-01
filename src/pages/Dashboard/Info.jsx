import styled from "styled-components";
import { ReactComponent as Icon } from "../../assets/images/activity.svg";

export const Info = ({ className }) => (
  <StyledInfo
    className={`flex flex-col justify-center items-center ${className}`}
  >
    <Icon />
    <div className="title">Слідкуйте за оновленнями системи</div>
    <div className="subtitle">
      Ми завжди прагнемо робити наш продукт ще кращим та відповідати вашим
      потребам у сфері нерухомості та обслуговування клієнтів.
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  padding: 40px 20px;
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  text-align: center;
  min-height: 200px;
  height: 100%;
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
  }
  .title {
    color: var(--dark-90);
    font-family: Overpass;
    font-size: 18px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 10px;
  }
  .subtitle {
    color: var(--second-color);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.28px;
  }
`;
