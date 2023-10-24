import { styled } from "styled-components";
import { Notification } from "./Notification";
import { Status } from "../../Status";
import { Info } from "./Info";
import { Avatar } from "./Avatar";
import { EditProfile } from "./EditProfile/EditProfile";
import { useState } from "react";
import { UserInfoCard } from "../../UserInfoCard/UserInfoCard";
import { NotificationsDropdown } from "./NotificationsDropdown/NotificationsDropdown";
import { useAppSelect } from "../../../hooks/redux";
import { useEffect } from "react";
import { useActions } from "../../../hooks/actions";
import {
  useLazyEditProfileQuery,
  useLazyGetUserQuery,
} from "../../../store/auth/auth.api";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";

export const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { user } = useAppSelect((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const { loginUser } = useActions();
  const [getProfile] = useLazyGetUserQuery();
  const [editProfile] = useLazyEditProfileQuery();

  const handleGetUserData = () => {
    getProfile().then((resp) => {
      loginUser(resp?.data?.data);
    });
  };

  useEffect(() => {
    setProfileData(user);
  }, [user]);

  const handleChangeField = (fieldName, value) => {
    const newData = { ...profileData, [fieldName]: value };
    setProfileData(newData);
  };

  const handleSave = () => {
    const { first_name, last_name, email, phones, password, photo } =
      profileData;

    editProfile({
      first_name,
      last_name,
      email,
      phones_json: JSON.stringify(phones),
      password: password?.length > 0 ? password : undefined,
      photo,
    }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Зміни успішно", {
          hideAfter: 3,
          position: "top-right",
        });
        handleGetUserData();
      })
    );
  };

  const handleReset = () => setProfileData(user);

  return (
    <>
      {openEdit && (
        <UserInfoCard
          onClose={() => setOpenEdit(false)}
          title="Особистий профіль"
          avatarBanner
          data={profileData}
          onChangeField={handleChangeField}
          onRefreshData={handleGetUserData}
          onSave={handleSave}
          onReset={handleReset}
        />
      )}
      <StyledProfile
        className="flex items-center clickable profile-header-block"
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
