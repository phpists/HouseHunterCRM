import { styled } from "styled-components";
import { ReactComponent as NotificationIcon } from "../../../assets/images/notification.svg";

export const Notification = () => (
  <StyledNotification className="flex items-center justify-center">
    <NotificationIcon />
  </StyledNotification>
);

const StyledNotification = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  transition: all 0.3s;
  cursor: pointer;
  margin-right: 18px;
  &:hover {
    background: #fff;
    path {
      fill: #5d63ff;
    }
  }
`;
