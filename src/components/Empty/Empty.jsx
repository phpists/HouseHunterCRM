import styled from "styled-components";
import { ReactComponent as Icon } from "../../assets/images/activity.svg";
import { Loader } from "../Loader";

export const Empty = ({ loading }) => (
  <StyledEmpty className="flex flex-col items-center justify-center">
    {loading ? (
      <Loader white />
    ) : (
      <>
        <Icon className="icon" />
        <div className="title">Пусто</div>
      </>
    )}
    {/* <div className="subtitle">
      Для того шоб почати працювати з платформою <br />
      необхідно заповнити дані компанії Або <br /> скористатися порадами по
      кроках налагтуваня
    </div> */}
  </StyledEmpty>
);

const StyledEmpty = styled.div`
  padding: 40px 20px;
  background: var(--dark-card-bg);
  height: 100%;
  margin-top: 30px;
  svg {
    height: 40px;
  }
  .icon {
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
