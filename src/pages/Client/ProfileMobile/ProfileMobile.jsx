import styled from "styled-components";
import { Phones } from "../../../components/Phones/Phones";
import { ReactComponent as Arrow } from "../../../assets/images/welcome-step-arrow.svg";
import { useState } from "react";
import { ProfileModal } from "./ProfileModal";
import { UserCard } from "../Profile/Header/UserCard";
import maskBackground from "../../../assets/images/auth-shape-mask.svg";
import { useParams } from "react-router-dom";
import {
  useLazyEditClientQuery,
  useLazyGetClientPhotosQuery,
} from "../../../store/clients/clients.api";
import { useEffect } from "react";
import cogoToast from "cogo-toast";
import {
  handleCheckAccess,
  handleRemovePhoneMask,
  handleResponse,
} from "../../../utilits";
import { useRef } from "react";
import {
  useGetAccessQuery,
  useGetPhonesCodesQuery,
} from "../../../store/auth/auth.api";

export const ProfileMobile = ({ data, onRefreshClientData }) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [updatedData, setUpdatedData] = useState({});
  const lastData = useRef({});
  const [editClient] = useLazyEditClientQuery();
  const [loading, setLoading] = useState(false);
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const [getClientPhotos] = useLazyGetClientPhotosQuery();
  const [photos, setPhotos] = useState([]);
  const [isAccess, setIsAccess] = useState(false);
  const { data: accessData } = useGetAccessQuery();

  useEffect(() => {
    setIsAccess(handleCheckAccess(accessData, "clients", "edit"));
  }, [accessData]);

  const handleRefreshData = () => {
    getClientPhotos(id).then((resp) => {
      setPhotos(
        resp?.data ? resp?.data?.filter((p) => typeof p === "object") : []
      );
    });
    onRefreshClientData();
  };

  useEffect(() => {
    const formatedDate = data
      ? {
          ...data,
          phone: data?.phone.map(({ code, ...phoneData }) => ({
            ...phoneData,
            code: phonesCodes?.find((phone) => phone.code === code)?.id,
          })),
        }
      : null;

    setUpdatedData(formatedDate);
    lastData.current = formatedDate;
    getClientPhotos(id).then((resp) => {
      setPhotos(
        resp?.data ? resp?.data?.filter((p) => typeof p === "object") : []
      );
    });
  }, [data, phonesCodes]);

  const handleSaveChanges = () => {
    setLoading(true);
    editClient({
      ...lastData.current,
      id_client: id,
      phones_json: JSON.stringify(
        lastData.current?.phone.map((phone) => ({
          ...phone,
          viber: phone.viber === "1",
          telegram: phone.telegram === "1",
          id_phone_code: phone?.code,
          phone: handleRemovePhoneMask(phone.phone),
        }))
      ),
      photos: photos?.filter((p) => !!p?.file)?.map((p) => p?.file),
    }).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        handleRefreshData();
        cogoToast.success("Зміни успішно збережено", {
          hideAfter: 3,
          position: "top-right",
        });
      });
    });
  };

  const handleChangeField = (fieldName, value) => {
    const newData = { ...updatedData, [fieldName]: value };
    lastData.current = newData;
    setUpdatedData(newData);
  };

  const handleReset = () => setUpdatedData(data);

  return (
    <>
      <StyledProfileMobile
        maskBackground={maskBackground}
        className="profileMobileContent"
        onClick={(e) =>
          e.target.classList.contains("profileMobileContent") && setOpen(true)
        }
      >
        <div className="flex items-center justify-between cursor-pointer">
          <div className="main-ptofile-info flex items-start">
            <UserCard
              photo={updatedData?.photo}
              name={`${data?.first_name ?? ""} ${data?.last_name ?? ""}`}
              email={updatedData?.email}
            />
            <Phones
              classNameContent="phones-wrapper"
              phones={
                updatedData?.phone?.map(
                  ({ code, phone }) =>
                    `${
                      phonesCodes?.find((phone) => phone?.id === code)?.code ??
                      ""
                    }${phone}`
                ) ?? []
              }
            />
          </div>
          <Arrow
            className="profile-mobile-arrow"
            onClick={() => setOpen(true)}
          />
        </div>
      </StyledProfileMobile>
      {open && (
        <ProfileModal
          onClose={() => setOpen(false)}
          data={updatedData}
          onChangeField={handleChangeField}
          onSave={handleSaveChanges}
          onReset={handleReset}
          loading={loading}
          onRefreshClientData={handleRefreshData}
          photos={photos}
          onChangePhotos={(val) => setPhotos(val)}
          isAccess={isAccess}
        />
      )}
    </>
  );
};

const StyledProfileMobile = styled.div`
  margin: 5px 0 0px;
  padding: 10px;
  border-radius: 15px;
  background: #3d3d3d;
  position: relative;
  .main-ptofile-info {
    gap: 10px;
    cursor: pointer;
  }
  .phones-wrapper {
    width: 229px;
  }
  .profile-mobile-arrow {
    width: 24px;
    height: 24px;
    path {
      fill-opacity: 0.4;
      transition: all 0.3s;
    }
  }
  &:hover {
    .profile-mobile-arrow {
      path {
        fill-opacity: 1;
      }
    }
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(${({ maskBackground }) => maskBackground}) center/cover
      no-repeat;
    background-size: 120%;
    background-position: -198px -557px;
  }

  @media (min-width: 1400px) {
    display: none;
  }
  @media (max-width: 700px) {
    .main-ptofile-info {
      flex-direction: column;
      gap: 10px;
    }

    .profile-mobile-arrow {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
`;
