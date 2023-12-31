import { styled } from "styled-components";
import { Notification } from "./Notification";
import { Status } from "../../Status";
import { Info } from "./Info";
import { Avatar } from "./Avatar";
import { useState } from "react";
import { UserInfoCard } from "../../UserInfoCard/UserInfoCard";
import { NotificationsDropdown } from "./NotificationsDropdown/NotificationsDropdown";
import { useAppSelect } from "../../../hooks/redux";
import { useEffect } from "react";
import { useActions } from "../../../hooks/actions";
import {
  useLazyDeleteAvatarQuery,
  useLazyEditProfileQuery,
  useLazyGetUserQuery,
} from "../../../store/auth/auth.api";
import { handleRemovePhoneMask, handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";

export const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { user } = useAppSelect((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const { loginUser } = useActions();
  const [getProfile] = useLazyGetUserQuery();
  const [editProfile] = useLazyEditProfileQuery();
  const [deleteAvatar] = useLazyDeleteAvatarQuery();
  const [errors, setErrors] = useState([]);

  const handleCheckAllFields = () => {
    const { first_name, last_name, email, phones } = profileData;
    const emptyFields = [
      ...[first_name?.length === 0 ? "first_name" : ""],
      ...[last_name?.length === 0 ? "last_name" : ""],
      ...[email?.length === 0 ? "email" : ""],
      ...[phones[0]?.phone?.length === 0 ? "phones" : ""],
      //   ...[password?.length === 0 ? "password" : []],
      "updated",
    ];

    setErrors(emptyFields);
    return emptyFields?.filter((e) => e.length > 0)?.length === 1;
  };

  const handleGetUserData = () => {
    getProfile().then((resp) => {
      loginUser(resp?.data?.data);
    });
  };

  useEffect(() => {
    setProfileData({
      ...user,
      phones: user.phones.map((p) => ({
        ...p,
        code: p.id_phone_code,
      })),
    });
  }, [user]);

  const handleChangeField = (fieldName, value) => {
    const newData = { ...profileData, [fieldName]: value };
    setProfileData(newData);
    setErrors(
      errors?.filter((e) => e !== "updated")?.filter((e) => e !== fieldName)
    );
  };

  const handleSave = () => {
    const { first_name, last_name, email, phones, password, photo } =
      profileData;
    if (handleCheckAllFields()) {
      editProfile({
        first_name,
        last_name,
        email,
        phones_json: JSON.stringify(
          phones.map((phone) => ({
            ...phone,
            viber: phone.viber === "1",
            telegram: phone.telegram === "1",
            id_phone_code: phone?.code,
            phone: handleRemovePhoneMask(phone.phone),
          }))
        ),
        password: password?.length > 0 ? password : undefined,
        photo: photo?.file,
      }).then((resp) =>
        handleResponse(resp, () => {
          cogoToast.success("Зміни успішно збережено", {
            hideAfter: 3,
            position: "top-right",
          });
          handleGetUserData();
        })
      );
    }
  };

  const handleReset = () => setProfileData(user);

  const handleRemoveAvatar = () => {
    if (profileData?.photo?.type) {
      handleChangeField("photo", null);
    } else {
      deleteAvatar().then((resp) =>
        handleResponse(resp, () => handleChangeField("photo", null))
      );
    }
  };

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
          logout
          profile
          billingTo={user?.billing_to}
          errors={errors}
          onRemoveAvatar={handleRemoveAvatar}
          noResetValueOnCodeChange
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
  ${({ openNotifications }) =>
    openNotifications && "background-position: right;"}
  @media (max-width: 1200px) {
    .status-tag {
      display: none;
    }
  }
`;
