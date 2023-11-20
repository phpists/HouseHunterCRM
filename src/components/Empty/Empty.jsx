import styled from "styled-components";
import activityIcon from "../../assets/images/activity.svg";

export const Empty = () => (
  <StyledEmpty className="flex flex-col items-center justify-center">
    <img src={activityIcon} alt="" />
    <div className="title">Пусто</div>
    {/* <div className="subtitle">
      Для того шоб почати працювати з платформою <br />
      необхідно заповнити дані компанії Або <br /> скористатися порадами по
      кроках налагтуваня
    </div> */}
  </StyledEmpty>
);

const StyledEmpty = styled.div`
  padding: 40px 20px;
  background: #323232;
  height: 100%;
  margin-top: 30px;
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
    margin-bottom: 4px;
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
