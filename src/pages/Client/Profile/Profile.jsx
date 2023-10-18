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
import { useLazyEditClientQuery } from "../../../store/clients/clients.api";
import { useParams } from "react-router-dom";
import cogoToast from "cogo-toast";
import { handleRemovePhoneMask } from "../../../utilits";

export const Profile = ({ className, data }) => {
  const { id } = useParams();
  const [updatedData, setUpdatedData] = useState({});
  const [editClient] = useLazyEditClientQuery();

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  const handleChangeField = (fieldName, value) =>
    setUpdatedData({ ...updatedData, [fieldName]: value });

  const handleSaveChanges = () => {
    editClient({
      ...updatedData,
      id_client: id,
      phones_json: JSON.stringify(
        updatedData?.phone.map((phone) => ({
          ...phone,
          id_phone_code: 1,
          phone: phone.phone?.includes("+38")
            ? handleRemovePhoneMask(phone.phone)
            : phone.phone,
        }))
      ),
    }).then((resp) => {
      if (resp?.data?.error === 0) {
        cogoToast.success("Зміни успішно збережено", {
          hideAfter: 3,
          position: "top-right",
        });
      } else if (resp?.data?.error) {
        cogoToast.error(resp?.data?.messege ?? "Помилка", {
          hideAfter: 3,
          position: "top-right",
        });
      }
    });
  };

  return (
    <StyledProfile maskBackground={maskBackground} className={className}>
      <Header
        photo={updatedData?.photo}
        name={updatedData?.full_name}
        email={updatedData?.email}
      />
      <Divider />
      <div className="profile-content hide-scroll">
        <SectionTitle title="Дані клієнта" />
        <BasicInfo
          firstName={updatedData?.first_name}
          lastName={updatedData?.last_name}
          onChangeField={handleChangeField}
          onSave={handleSaveChanges}
        />
        <SectionTitle title="Контакти" />
        <Contact
          phones={updatedData?.phone ?? []}
          email={updatedData?.email}
          onChangeField={handleChangeField}
        />
        <SectionTitle title="Коментар" />
        <Comment
          comment={updatedData?.comment}
          onChange={(val) => handleChangeField("comment", val)}
          onSave={handleSaveChanges}
        />
        <SectionTitle title="Фото / Додатково" />
        <OtherInfo />
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
