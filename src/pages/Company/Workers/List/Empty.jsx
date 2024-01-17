import styled from "styled-components";
import activityIcon from "../../../../assets/images/activity.svg";

export const Empty = ({ noSubtitle, className }) => (
  <StyledEmpty className={className}>
    <img src={activityIcon} alt="icon" />
    <div className="title">Упс, тут пусто!</div>
  </StyledEmpty>
);

const StyledEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  img {
    margin-bottom: 4px;
  }
  .title {
    color: rgba(255, 255, 255, 0.9);
    font-family: Overpass;
    font-size: 18px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 10px;
  }
  .subtitle {
    color: rgba(255, 255, 255, 0.4);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    letter-spacing: 0.28px;
  }
`;
