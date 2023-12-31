import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Divider } from "./Divider";
import { SectionTitle } from "./SectionTitle";
import { BasicInfo } from "./BasicInfo";
import { Contact } from "./Contact/Contact";
import { Comment } from "./Comment";
import { OtherInfo } from "./OtherInfo/OtherInfo";
import maskBackground from "../../../assets/images/auth-shape-mask.svg";
import { useEffect, useState } from "react";
import {
  useLazyEditClientQuery,
  useLazyGetClientPhotosQuery,
} from "../../../store/clients/clients.api";
import { useParams } from "react-router-dom";
import cogoToast from "cogo-toast";
import {
  handleCheckAccess,
  handleRemovePhoneMask,
  handleResponse,
} from "../../../utilits";
import { Footer } from "./Footer";
import {
  useGetAccessQuery,
  useGetPhonesCodesQuery,
} from "../../../store/auth/auth.api";

export const Profile = ({ className, data, onRefreshClientData }) => {
  const { id } = useParams();
  const [updatedData, setUpdatedData] = useState({});
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
    setUpdatedData(
      data
        ? {
            ...data,
            phone: data?.phone.map(({ code, ...phoneData }) => ({
              ...phoneData,
              code: phonesCodes?.find((phone) => phone.code === code)?.id,
            })),
          }
        : null
    );
    getClientPhotos(id).then((resp) => {
      setPhotos(
        resp?.data ? resp?.data?.filter((p) => typeof p === "object") : []
      );
    });
  }, [data, phonesCodes]);

  const handleChangeField = (fieldName, value) => {
    setUpdatedData({ ...updatedData, [fieldName]: value });
  };

  const handleSaveChanges = () => {
    setLoading(true);
    editClient({
      ...updatedData,
      id_client: id,
      phones_json: JSON.stringify(
        updatedData?.phone.map((phone) => ({
          ...phone,
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

  const handleReset = () => setUpdatedData(data);

  return (
    <StyledProfile maskBackground={maskBackground} className={className}>
      <Header
        name={`${data?.first_name ?? ""} ${data?.last_name ?? ""}`}
        email={updatedData?.email}
      />
      <Divider />
      <div className="profile-content hide-scroll">
        <SectionTitle title="Дані клієнта" />
        <BasicInfo
          firstName={updatedData?.first_name}
          lastName={updatedData?.last_name}
          onChangeField={handleChangeField}
          readOnly={!isAccess}
        />
        <SectionTitle title="Контакти" />
        <Contact
          phones={updatedData?.phone ?? []}
          email={updatedData?.email}
          onChangeField={handleChangeField}
          readOnly={!isAccess}
        />
        {isAccess ? (
          <>
            <SectionTitle title="Коментар" />
            <Comment
              comment={updatedData?.comment}
              onChange={(val) => handleChangeField("comment", val)}
              readOnly={!isAccess}
            />
          </>
        ) : data?.comment?.length > 0 ? (
          <>
            <SectionTitle title="Коментар" />
            <Comment
              comment={updatedData?.comment}
              onChange={(val) => handleChangeField("comment", val)}
              readOnly={!isAccess}
            />
          </>
        ) : null}
        {isAccess ? (
          <>
            <SectionTitle title="Фото / Додатково" />
            <OtherInfo
              photos={photos}
              onChange={(val) => setPhotos(val)}
              onRefreshClientData={handleRefreshData}
              readOnly={!isAccess}
            />
          </>
        ) : photos?.length > 0 ? (
          <>
            <SectionTitle title="Фото / Додатково" />
            <OtherInfo
              photos={photos}
              onChange={(val) => setPhotos(val)}
              onRefreshClientData={handleRefreshData}
              readOnly={!isAccess}
            />
          </>
        ) : null}
        {isAccess && (
          <Footer
            onSave={handleSaveChanges}
            onReset={handleReset}
            loading={loading}
          />
        )}
      </div>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  width: 316px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #3d3d3d;
  position: relative;
  .profile-content {
    padding: 0 10px 10px;
    height: calc(100svh - 348px);
    overflow: auto;
    border-radius: 10px;
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
    background-size: 200%;
    background-position: -292px -557px;
  }
  @media (min-width: 1400px) {
    width: 290px;
  }
  @media (min-width: 1600px) {
    width: 316px;
  }
`;
