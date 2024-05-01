import { styled } from "styled-components";
import { ReactComponent as Icon } from "../../../assets/images/check.svg";

export const Time = ({ time }) => (
  <StyledTime className="flex items-center justify-center">
    <div className="time">{time}</div> <Icon />
  </StyledTime>
);

const StyledTime = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  border-radius: 30px;
  background: var(--chat-tag-bg);
  backdrop-filter: blur(20px);
  padding: 4px;
  font-size: 12px;
  font-weight: var(--font-weight-light);
  line-height: 100%;
  letter-spacing: 0.24px;
  height: 17px;
  svg {
    margin-left: 3px;
  }
  .time {
    height: 10px;
  }
`;
