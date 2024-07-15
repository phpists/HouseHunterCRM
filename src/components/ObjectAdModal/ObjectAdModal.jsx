import styled from "styled-components";
import { CloseButton } from "./CloseButton";
import { Title } from "./Title";
import { Header } from "./Header/Header";
import { Platforms } from "./Platforms/Platforms";
import { Info } from "./Info/Info";
import { useEffect, useState } from "react";
import { useLazyPublishObjectQuery } from "../../store/objects/objects.api";
import { handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";

export const ObjectAdModal = ({ onClose, object }) => {
  const [data, setData] = useState({
    title: "",
    desciption: "",
  });
  const [loading, setLoading] = useState(false);
  const [publishObject] = useLazyPublishObjectQuery();

  const handleChangeField = (field, value) =>
    setData({ ...data, [field]: value });

  useEffect(() => {
    setData({
      title: object?.title ?? "",
      description: object?.description?.replaceAll("<br />", "\n") ?? "",
    });
  }, [object]);

  const handleSubmit = () => {
    setLoading(true);
    publishObject(object?.id).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        const messages = {
          new: "Нове оголошення, до активації та провірки",
          active: "Опубліковано на olx",
          limited:
            "Вичерпаний ліміт безкоштовних оголошень у вибраній категорії",
          removed_by_user: "Видалено користувачем",
          outdated: "Оголошення досягло дати придатності",
          unconfirmed: "Оголошення очікує на підтвердження ",
          unpaid: "Очікується оплата",
          moderated: "Відхилено модератором",
          blocked: "Заблоковано модератором",
          disabled:
            "Вимкнено модерацією, пропозиція заблокована та очікує перевірки",
          removed_by_moderator: "Видалено",
        };
        onClose();
        cogoToast.info(
          messages[resp?.data?.status] ?? "Оголошення успішно опубліковано",
          {
            hideAfter: 3,
            position: "top-right",
          }
        );
      });
    });
  };

  return (
    <StyledObjectAdModal>
      <div className="modal-wrapper">
        <CloseButton onClick={onClose} />
        <Title />
        <Header onSubmit={handleSubmit} loading={loading} />
        <div className="content">
          <Platforms />
          <Info data={data} onChange={handleChangeField} />
        </div>
      </div>
    </StyledObjectAdModal>
  );
};

const StyledObjectAdModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: #2c2c2c66;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-wrapper {
    background: var(--modal-bg);
    padding: 40px;
    border-radius: 10px;
    width: 96svw;
    max-width: 750px;
    position: relative;
  }
  .content {
    display: grid;
    grid-template-columns: 330px 1fr;
    gap: 40px;
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }
`;
