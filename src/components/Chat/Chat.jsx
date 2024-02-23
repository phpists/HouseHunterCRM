import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer/Footer";
import { useLazyShowChatQuery } from "../../store/selections/selections.api";
import { handleResponse } from "../../utilits";

export const Chat = ({ onClose, rieltor, requestObjectId }) => {
  const [showChat] = useLazyShowChatQuery();
  const [data, setData] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [client, setClient] = useState({});
  const handleSelectMessage = (msg) =>
    setSelectedMessage(msg === selectedMessage ? null : msg);

  const handleGetChat = () => {
    showChat(requestObjectId).then((resp) =>
      handleResponse(resp, () => {
        setData(resp?.data?.data);
        setSelectedMessage(null);
        setClient(resp?.data?.client_info);
      })
    );
  };

  useEffect(() => {
    handleGetChat();
  }, []);

  return (
    <>
      <StyledChat>
        <Header onCloseChat={onClose} rieltor={client} />
        <Content
          data={data}
          selected={selectedMessage}
          onSelect={handleSelectMessage}
          rieltorName={client?.name ?? "Рієлтор"}
          requestObjectId={requestObjectId}
        />
        <Footer
          onRefreshData={handleGetChat}
          selectedMessage={selectedMessage}
          onCloseSelectedMessage={() => setSelectedMessage(null)}
          rieltorName={client?.name ?? "Рієлтор"}
          requestObjectId={requestObjectId}
        />
      </StyledChat>
      <div className="modal-overlay" onClick={onClose}></div>
    </>
  );
};

const StyledChat = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: #3d3d3d;
  backdrop-filter: blur(12.5px);
  width: 90%;
  max-width: 439px;
  z-index: 100;
  padding: 20px 22px 20px 20px;
`;
