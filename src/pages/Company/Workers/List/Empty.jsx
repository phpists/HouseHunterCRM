import styled from "styled-components";
import { ReactComponent as Icon } from "../../../../assets/images/activity.svg";

export const Empty = ({ noSubtitle, className }) => (
  <StyledEmpty className={className}>
    <Icon />
    <div className="title">Упс, тут пусто!</div>
  </StyledEmpty>
);

const StyledEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  svg {
    margin-bottom: 4px;
  }
  .title {
    color: var(--dark-90);
    font-family: Overpass;
    font-size: 18px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 10px;
  }
  .subtitle {
    color: var(--second-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    letter-spacing: 0.28px;
  }
`;
