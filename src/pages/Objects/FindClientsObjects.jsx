import styled from "styled-components";
import { Modal } from "../../components/Modal/Modal";
import { useLazyGetPhoneObjectQuery } from "../../store/objects/objects.api";
import { useEffect, useState } from "react";
import { handleCopy, handleResponse } from "../../utilits";
import { Loader } from "../../components/Loader";
import { Phones } from "../../components/Phones/Phones";
import { Phone } from "../../components/Phones/Phone";
import { useNavigate } from "react-router-dom";

export const FindClientsObjects = ({ onClose, id, phones, setPhones }) => {
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
          ) : phones?.length === 0 ? (
            <div className="empty">Пусто</div>
          ) : (
            <div className="phoneList">
              {phones?.map((p, i) => (
                <Phone
                  key={i}
                  phone={p?.phone}
                  maskedPhone={p?.phone}
                  className="phone-card"
                  onClick={() => handleCopy(p?.phone)}
                />
              ))}
            </div>
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
