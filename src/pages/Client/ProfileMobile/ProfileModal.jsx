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
  isAccess,
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
              readOnly={!isAccess}
            />
            <SectionTitle title="Контакти" />
            <Contact
              phones={data?.phone ?? []}
              email={data?.email}
              onChangeField={onChangeField}
              readOnly={!isAccess}
            />
            {isAccess ? (
              <>
                <SectionTitle title="Коментар" />
                <Comment
                  comment={data?.comment}
                  onChange={(val) => onChangeField("comment", val)}
                  readOnly={!isAccess}
                />
              </>
            ) : data?.comment?.length > 0 ? (
              <>
                <SectionTitle title="Коментар" />
                <Comment
                  comment={data?.comment}
                  onChange={(val) => onChangeField("comment", val)}
                  readOnly={!isAccess}
                />
              </>
            ) : null}
            {isAccess ? (
              <>
                <SectionTitle title="Фото / Додатково" />
                <OtherInfo
                  photos={photos}
                  onChange={(val) => onChangePhotos(val)}
                  onRefreshClientData={onRefreshClientData}
                  readOnly={!isAccess}
                />
              </>
            ) : photos?.length > 0 ? (
              <>
                <SectionTitle title="Фото / Додатково" />
                <OtherInfo
                  photos={photos}
                  onChange={(val) => onChangePhotos(val)}
                  onRefreshClientData={onRefreshClientData}
                  readOnly={!isAccess}
                />
              </>
            ) : null}
          </div>
        </div>
        {isAccess ? (
          <Footer onSave={onSave} onReset={onReset} loading={loading} />
        ) : null}
      </Modal>
      <div className="modal-overlay" onClick={onClose}></div>
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
