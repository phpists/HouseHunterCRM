import styled from "styled-components";
import { Footer } from "./Footer";
import { Modal } from "../Modal/Modal";
import { UserCard } from "../Profile/Header/UserCard";
import { SectionTitle } from "../Profile/SectionTitle";
import { BasicInfo } from "../Profile/BasicInfo";
import { Contact } from "../Profile/Contact/Contact";
import { Comment } from "../Profile/Comment";
import { OtherInfo } from "../Profile/OtherInfo/OtherInfo";

export const ProfileModal = ({
  onClose,
  data,
  onChangeField,
  onSave,
  onReset,
  loading,
  onRefreshClientData,
  photos,
  onChangePhotos,
}) => {
  return (
    <StyledProfileModal>
      <Modal title="Профіль клієнта" onClose={onClose}>
        <div className="profile-modal-content">
          <UserCard
            photo={data?.photo}
            name={`${data?.first_name ?? ""} ${data?.last_name ?? ""}`}
            email={data?.email}
          />
          <div>
            <SectionTitle title="Дані клієнта" />
            <BasicInfo
              firstName={data?.first_name}
              lastName={data?.last_name}
              onChangeField={onChangeField}
            />
            <SectionTitle title="Контакти" />
            <Contact
              phones={data?.phone ?? []}
              email={data?.email}
              onChangeField={onChangeField}
            />
            <SectionTitle title="Коментар" />
            <Comment
              comment={data?.comment}
              onChange={(val) => onChangeField("comment", val)}
            />
            <SectionTitle title="Фото / Додатково" />
            <OtherInfo
              photos={photos}
              onChange={(val) => onChangePhotos(val)}
              onRefreshClientData={onRefreshClientData}
            />
          </div>
          <Footer onSave={onSave} onReset={onReset} loading={loading} />
        </div>
      </Modal>
    </StyledProfileModal>
  );
};

const StyledProfileModal = styled.div`
  .profile-modal-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;
