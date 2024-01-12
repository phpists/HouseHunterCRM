import { styled } from "styled-components";
import { ReactComponent as NotificationIcon } from "../../../assets/images/notification.svg";

export const Notification = ({ active, onToggle, count }) => (
  <StyledNotification
    className="flex items-center justify-center"
    onClick={onToggle}
  >
    <NotificationIcon />
    {count > 0 ? <div>{count}</div> : null}
  </StyledNotification>
);

const StyledNotification = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  transition: all 0.3s;
  cursor: pointer;
  margin-right: 18px;
  position: relative;
  div {
    position: absolute;
    right: 0px;
    top: 1px;
    background: #f94343;
    padding: 4px;
    color: #fff;
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: 1; /* 127.273% */
    border-radius: 100%;
    min-width: 16px;
    height: 16px;
  }
  &:hover {
    background: #fff;
    path {
      fill: #5d63ff;
    }
  }
  @media (max-width: 1200px) {
    margin-right: 14px;
  }
`;
