import styled from "styled-components";
import { Footer } from "./Footer";
import { Modal } from "../Modal/Modal";
import { UserCard } from "../Profile/Header/UserCard";
import { SectionTitle } from "../Profile/SectionTitle";
import { BasicInfo } from "../Profile/BasicInfo";
import { Contact } from "../Profile/Contact/Contact";
import { Comment } from "../Profile/Comment";
import { OtherInfo } from "../Profile/OtherInfo/OtherInfo";

export const ProfileModal = ({ onClose }) => {
  return (
    <StyledProfileModal>
      <Modal title="Профіль клієнта" onClose={onClose}>
        <div className="profile-modal-content">
          <UserCard />
          <div>
            <SectionTitle title="Дані клієнта" />
            <BasicInfo />
            <SectionTitle title="Контакти" />
            <Contact />
            <SectionTitle title="Коментар" />
            <Comment />
            <SectionTitle title="Фото / Додатково" />
            <OtherInfo />
          </div>
          <Footer />
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
