import styled from "styled-components";
import icon from "../../assets/images/activity.svg";

export const Info = () => (
  <StyledInfo className="flex flex-col justify-center items-center">
    <img src={icon} alt="" />
    <div className="title">Слідкуйте за оновленнями системи</div>
    <div className="subtitle">
      Ми завжди прагнемо робити наш продукт ще кращим та відповідати вашим
      потребам у сфері нерухомості та обслуговування клієнтів.
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  padding: 40px 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  text-align: center;
  min-height: 200px;
  img {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
  }
  .title {
    color: rgba(255, 255, 255, 0.9);
    font-family: Overpass;
    font-size: 18px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 10px;
  }
  .subtitle {
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    letter-spacing: 0.28px;
  }
`;
