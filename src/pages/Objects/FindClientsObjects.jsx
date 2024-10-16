import styled from "styled-components";
import { Modal } from "../../components/Modal/Modal";
import { useLazyGetPhoneObjectQuery } from "../../store/objects/objects.api";
import { useEffect, useState } from "react";
import { handleResponse } from "../../utilits";
import { Loader } from "../../components/Loader";
import { Phones } from "../../components/Phones/Phones";
import { Phone } from "../../components/Phones/Phone";
import { useNavigate } from "react-router-dom";

export const FindClientsObjects = ({ onClose, id }) => {
  const [getClient] = useLazyGetPhoneObjectQuery();
  const [clientPhones, setClientPhones] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowClient = () => {
    setLoading(true);
    getClient(id).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        setClientPhones(resp?.data?.contact?.phones ?? []);
      });
    });
  };

  useEffect(() => {
    if (id) {
      handleShowClient();
    }
  }, [id]);

  return (
    <StyledFindClientsObjects>
      <Modal title="Знайти всі об'єкти у даного клієнта" onClose={onClose}>
        <div>
          {loading ? (
            <Loader white className="loader" />
          ) : clientPhones?.length === 0 ? (
            <div className="empty">Пусто</div>
          ) : (
            <div className="phoneList">
              {clientPhones?.map((p, i) => (
                <Phone
                  key={i}
                  phone={p?.phone}
                  maskedPhone={p?.phone}
                  className="phone-card"
                  onClick={() =>
                    window.open(
                      `/objects?findClientsObjects=${p?.phone}`,
                      "_blank"
                    )
                  }
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
