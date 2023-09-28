import { styled } from "styled-components";
import { Notification } from "./Notification";
import { Status } from "../../Status";
import { Info } from "./Info";
import { Avatar } from "./Avatar";
import { EditProfile } from "./EditProfile/EditProfile";
import { useState } from "react";
import { UserInfoCard } from "../../UserInfoCard/UserInfoCard";
import { NotificationsDropdown } from "./NotificationsDropdown/NotificationsDropdown";

export const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  return (
    <>
      {openEdit && (
        <UserInfoCard
          onClose={() => setOpenEdit(false)}
          title="Особистий профіль"
          avatarBanner
        />
      )}
      <StyledProfile
        className="flex items-center clickable"
        onClick={(e) =>
          e.target.classList.contains("clickable") && setOpenEdit(true)
        }
        openNotifications={openNotifications}
      >
        <Notification
          active={openNotifications}
          onToggle={() => setOpenNotifications(!openNotifications)}
          count={4}
        />
        {openNotifications && <NotificationsDropdown />}
        <div className="flex items-start clickable">
          <Status status={1} className="clickable status-tag" />
          <Info />
        </div>
        <Avatar />
      </StyledProfile>
    </>
  );
};

const StyledProfile = styled.div`
  padding: 3px 3px 3px 14px;
  border-radius: 6px;
  cursor: pointer;
  background: ${({ openNotifications }) =>
    openNotifications ? "#474747" : "#2c2c2c"};
  background: linear-gradient(to right, #2c2c2c 50%, #474747 50%) left;
  background-size: 200%;
  transition: 0.3s ease-out;
  position: relative;
  &:hover {
    background-position: right;
  }
  @media (max-width: 1200px) {
    .status-tag {
      display: none;
    }
  }
`;
