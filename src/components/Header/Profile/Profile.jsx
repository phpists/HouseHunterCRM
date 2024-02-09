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
  useGetNotificationsQuery,
  useLazyDeleteAvatarQuery,
  useLazyEditProfileQuery,
  useLazyGetUserQuery,
  useLazyLogoutQuery,
} from "../../../store/auth/auth.api";
import {
  handleFormatDate,
  handleFormatInputDate,
  handleFromInputDate,
  handleRemovePhoneMask,
  handleResponse,
} from "../../../utilits";
import cogoToast from "cogo-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Confirm } from "../../Confirm/Confirm";

export const Profile = () => {
  const { pathname } = useLocation();
  const [openEdit, setOpenEdit] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const { user } = useAppSelect((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const { loginUser } = useActions();
  const [getProfile] = useLazyGetUserQuery();
  const [editProfile] = useLazyEditProfileQuery();
  const [deleteAvatar] = useLazyDeleteAvatarQuery();
  const [errors, setErrors] = useState([]);
  const { data } = useGetNotificationsQuery();
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckAllFields = () => {
    const { first_name, last_name, email, phones } = profileData;
    const emptyFields = [
      ...[first_name?.length === 0 ? "first_name" : ""],
      ...[last_name?.length === 0 ? "last_name" : ""],
      ...[email?.length === 0 ? "email" : ""],
      ...[
        phones?.filter((p) => p?.phone?.length === 0)?.length > 0
          ? "phones"
          : "",
      ],
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
      dt_birthday:
        user?.dt_birthday === "0"
          ? null
          : handleFormatDate(new Date(Number(user?.dt_birthday) * 1000), true),
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
      setLoading(true);
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
        dt_birthday: Math.floor(
          profileData?.dt_birthday === "0"
            ? null
            : new Date(
                handleFromInputDate(profileData?.dt_birthday)
              )?.getTime() / 1000
        ),
      }).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          cogoToast.success("Зміни успішно збережено", {
            hideAfter: 3,
            position: "top-right",
          });
          setOpenEdit(false);
          handleGetUserData();
        });
      });
    }
  };

  const handleReset = () =>
    setProfileData({
      ...user,
      phones: user.phones.map((p) => ({
        ...p,
        code: p.id_phone_code,
      })),
      dt_birthday:
        user?.dt_birthday === "0"
          ? null
          : handleFormatDate(new Date(Number(user?.dt_birthday) * 1000), true),
    });

  const handleRemoveAvatar = () => {
    if (profileData?.photo?.type) {
      handleChangeField("photo", null);
    } else {
      deleteAvatar().then((resp) =>
        handleResponse(resp, () => handleChangeField("photo", null))
      );
    }
  };

  useEffect(() => {
    setOpenNotifications(false);
  }, [pathname]);

  const handleFormat = (date) => {
    const formated = date.split(" ");
    const hours = formated[1];
    const dateSplited = formated[0]?.split(".");

    return Math.floor(
      new Date(
        `${dateSplited[1]}.${dateSplited[0]}.${dateSplited[2]} ${hours}`
      )?.getTime() / 1000
    );
  };

  const handleOpenNotifications = () => {
    if (data?.count_notify > 0) {
      setOpenNotifications(!openNotifications);
    } else {
      cogoToast.error("Немає сповіщень", {
        hideAfter: 3,
        position: "top-right",
      });
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("modalClosed");
    navigate("/auth");
    loginUser(null);
  };

  return (
    <>
      {openLogout && (
        <Confirm
          onClose={() => setOpenLogout(false)}
          title="Ви точно хочете вийти?"
          onSubmit={handleLogout}
        />
      )}
      {openEdit && (
        <UserInfoCard
          onClose={() => setOpenEdit(false)}
          title="Особистий профіль"
          avatarBanner
          data={{
            ...profileData,
            billing_to: user?.billing_to ? handleFormat(user?.billing_to) : "",
          }}
          onChangeField={handleChangeField}
          onRefreshData={handleGetUserData}
          onSave={handleSave}
          onReset={handleReset}
          logout
          profile
          billingTo={user?.billing_to ? handleFormat(user?.billing_to) : ""}
          errors={errors}
          onRemoveAvatar={handleRemoveAvatar}
          noResetValueOnCodeChange
          onLogout={() => setOpenLogout(true)}
          loading={loading}
          isEdit={true}
        />
      )}
      <StyledProfile
        className="flex items-center clickable profile-header-block"
        onClick={(e) =>
          e.target.classList.contains("clickable") && setOpenEdit(true)
        }
        openNotifications={openNotifications}
      >
        <button
          onClick={() => setOpenNotifications(!openNotifications)}
          onBlur={() => setOpenNotifications(false)}
        >
          <Notification
            active={openNotifications}
            onToggle={handleOpenNotifications}
            count={data?.count_notify}
          />
          {openNotifications && <NotificationsDropdown data={data} />}
        </button>
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
