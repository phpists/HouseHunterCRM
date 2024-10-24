import styled from "styled-components";
import activityIcon from "../../../assets/images/activity.svg";

export const EmptyBlock = () => (
  <StyledEmptyBlock className="flex flex-col items-center justify-center">
    <img src={activityIcon} alt="" />
    <div className="title">Почніть роботу з платформою</div>
    <div className="subtitle">
      Для того шоб почати працювати з платформою <br />
      необхідно заповнити дані компанії Або <br /> скористатися порадами по
      кроках налаштування
    </div>
  </StyledEmptyBlock>
);

const StyledEmptyBlock = styled.div`
  padding: 15px 20px;
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  height: 100%;
  img {
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
    margin-bottom: 4px;
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
  @media (max-width: 1200px) {
    padding: 20px;
  }
  @media (max-width: 600px) {
    padding: 20px;
    img,
    .title {
      margin-bottom: 8px;
    }
  }
`;
