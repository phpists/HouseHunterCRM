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
  handleFromInputDate,
  handleRemovePhoneMask,
  handleResponse,
  showAlert,
} from "../../../utilits";
import { useLocation, useNavigate } from "react-router-dom";
import { Confirm } from "../../Confirm/Confirm";
import axios from "axios";
import { baseUrlWebsoket } from "../../../api/baseUrl";
import { io } from "socket.io-client";
import { CarMainInfoFileds } from "../../../constants";

export const Profile = () => {
  const { pathname } = useLocation();
  const [openEdit, setOpenEdit] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const { user, notifications } = useAppSelect((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const { loginUser, addNotification } = useActions();
  const [getProfile] = useLazyGetUserQuery();
  const [editProfile] = useLazyEditProfileQuery();
  const [deleteAvatar] = useLazyDeleteAvatarQuery();
  const [errors, setErrors] = useState([]);
  const { data, refetch } = useGetNotificationsQuery();
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [closed, setClosed] = useState([]);
  // const [getRubricField, { data: fields }] = useLazyGetRubricsFieldsQuery();

  const handleCheckIsRefresh = () => {
    const now = new Date()?.getTime() / 1000;
    const lastActive = new Date(user?.last_active)?.getTime() / 1000;
    const timePassed = now - lastActive;
    const TWELVE_HOURS = 43200;

    if (timePassed >= TWELVE_HOURS) {
      setClosed([]);
      localStorage.removeItem("closedNotifications");
    }
  };

  const handleCloseNotification = (key) => {
    const updatedClosed = [...closed, key];
    localStorage.setItem("closedNotifications", JSON.stringify(updatedClosed));
    setClosed(updatedClosed);
  };

  useEffect(() => {
    const closedNotifications = localStorage.getItem("closedNotifications");

    if (closedNotifications) {
      setClosed(JSON.parse(closedNotifications));
    }
  }, []);

  useEffect(() => {
    user && handleCheckIsRefresh();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    data && refetch();
  }, [pathname]);

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
    if (user) {
      setProfileData({
        ...user,
        phones: user?.phones.map((p) => ({
          ...p,
          code: p.id_phone_code,
        })),
        dt_birthday:
          user?.dt_birthday === "0"
            ? null
            : handleFormatDate(
                new Date(Number(user?.dt_birthday) * 1000),
                true
              ),
      });
    }
  }, [user]);

  const handleChangeField = (fieldName, value) => {
    const newData = { ...profileData, [fieldName]: value };
    setProfileData(newData);
    setErrors(
      errors?.filter((e) => e !== "updated")?.filter((e) => e !== fieldName)
    );
  };

  const handleSave = () => {
    const {
      first_name,
      last_name,
      email,
      phones,
      password,
      photo,
      id_baner,
      public_access,
      is_orenda,
      is_sell,
    } = profileData;
    if (handleCheckAllFields()) {
      setLoading(true);
      editProfile({
        first_name,
        last_name,
        email,
        id_baner,
        public_access,
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
        is_orenda,
        is_sell,
      }).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          showAlert("success", "Зміни успішно збережено");
          setOpenEdit(false);
          handleGetUserData();
        });
      });
    }
  };

  const handleReset = () =>
    user &&
    setProfileData({
      ...user,
      phones: user?.phones.map((p) => ({
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
      deleteAvatar().then((resp) => {
        handleResponse(resp, () => handleChangeField("photo", null));
        handleGetUserData();
      });
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
    setOpenNotifications(!openNotifications);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("modalClosed");
    localStorage.removeItem("clientsFilters");
    localStorage.removeItem("objectsLastFilters");
    localStorage.removeItem("requestFilter");
    localStorage.removeItem("callsFilter");
    window.location.href = "/auth";
    window.location.reload(true);
  };

  const handleGetTagValue = (field, value) =>
    CarMainInfoFileds?.find((f) => f.field === field)?.field_option?.[value] ??
    value;

  useEffect(() => {
    // getRubricField(1);
    let socket;
    let interval;
    if (CarMainInfoFileds) {
      socket = new WebSocket(
        `wss://socket.cars.xcorp.com.ua/socket/?token=${localStorage.getItem(
          "token"
        )}`
      );

      function sendMessage() {
        socket.send("Get");
      }
      interval = setInterval(sendMessage, 900000);

      socket.onopen = () => {};

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message?.error === 0) {
            const data = JSON.parse(message?.data);
            const image =
              data?.photo_links_json?.length > 0
                ? JSON.parse(data?.photo_links_json)?.[0]
                : null;

            addNotification({
              ...data,
              date: new Date().getTime(),
              id_filter: message?.id_filter,
              image,
              volume_engine: handleGetTagValue(
                "volume_engine",
                data?.volume_engine
              ),
              id_type_fuel: handleGetTagValue(
                "id_type_fuel",
                data?.id_type_fuel
              ),
              id_type_body: handleGetTagValue(
                "id_type_body",
                data?.id_type_body
              ),
            });
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
    }

    return () => {
      socket?.close();
      clearInterval(interval);
    };
  }, []);

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
          title="Профіль"
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
          userProfile
        />
      )}
      <div className="relative flex items-center">
        <Notification
          active={openNotifications}
          onToggle={handleOpenNotifications}
          count={data?.count_notify + notifications?.length}
        />
        <NotificationsDropdown
          data={data}
          open={openNotifications}
          onToggleOpen={(val) => setOpenNotifications(val)}
          closed={closed}
          onClose={handleCloseNotification}
          notifications={notifications}
        />
        {openNotifications && (
          <div
            className="modal-overlay"
            onClick={() => setOpenNotifications(false)}
          ></div>
        )}
        <StyledProfile
          className="flex items-center clickable profile-header-block"
          onClick={(e) =>
            e.target.classList.contains("clickable") && setOpenEdit(true)
          }
        >
          <div className="flex items-start clickable">
            <Status
              status={user?.struct_level}
              className="clickable status-tag"
            />
            <Info />
          </div>
          <Avatar />
        </StyledProfile>
      </div>
    </>
  );
};

const StyledProfile = styled.div`
  padding: 3px 3px 3px 14px;
  border-radius: 6px;
  cursor: pointer;
  background: ${({ openNotifications }) =>
    openNotifications === "true" ? "var(--second-bg)" : "#2c2c2c"};
  background: linear-gradient(
      to right,
      var(--main-bg) 50%,
      var(--second-bg) 50%
    )
    left;
  background-size: 200%;
  transition: 0.3s ease-out;
  position: relative;
  &:hover {
    background-position: right;
  }
  ${({ opennotifications }) =>
    opennotifications === "true" && "background-position: right;"}
  @media (max-width: 1200px) {
    .status-tag {
      display: none;
    }
  }
`;
