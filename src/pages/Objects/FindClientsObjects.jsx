import styled from "styled-components";
import { Modal } from "../../components/Modal/Modal";
import { useLazyGetPhoneObjectQuery } from "../../store/objects/objects.api";
import { useEffect, useState } from "react";
import { handleCopy, handleResponse } from "../../utilits";
import { Loader } from "../../components/Loader";
import { Phones } from "../../components/Phones/Phones";
import { Phone } from "../../components/Phones/Phone";
import { useNavigate } from "react-router-dom";
import rst from "../../assets/images/rst.svg";
import olx from "../../assets/images/olx.png";
import Autoria from "../../assets/images/autoria.svg";
import Viber from "../../assets/images/viber.svg";
import Telegram from "../../assets/images/telegram.svg";
import PhoneImg from "../../assets/images/small-phone.svg";
import { Tag } from "../../components/ObjectCard/MainInfo/Tags/Tag";
import { useAppSelect } from "../../hooks/redux";
import ContactsContent from "../../components/Car/ContactsContent";

export const FindClientsObjects = ({
  data,
  onClose,
  id,
  phones,
  setPhones,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const [getClient] = useLazyGetPhoneObjectQuery();
  const [loading, setLoading] = useState(false);

  const handleShowClient = () => {
    setLoading(true);
    getClient(id).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        setPhones(resp?.data?.contact?.phones ?? []);
      });
    });
  };

  useEffect(() => {
    if (!phones) {
      if (id) {
        handleShowClient();
      }
    }
  }, [id]);

  return (
    <StyledFindClientsObjects>
      <Modal title="Телефони" onClose={onClose}>
        <div>
          {loading ? (
            <Loader white className="loader" />
          ) : phones ? (
            <ContactsContent isMainPage data={data} phones={phones} />
          ) : (
            <div className="empty">Пусто</div>
          )}
        </div>
      </Modal>
    </StyledFindClientsObjects>
  );
};

const StyledFindClientsObjects = styled.div`
  position: absolute;
  .loader {
    height: 40px;
  }
  .empty {
    color: var(--dark-90);
    font-family: Overpass;
    font-size: 18px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 4px;
    text-align: center;
  }
  .phoneList {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 10px;
  }
  .phone-card {
    border-radius: 6px !important;
    cursor: pointer;
  }
`;
