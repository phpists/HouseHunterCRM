import { useState } from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer/Footer";

export const Chat = ({ onClose, rieltor, onOpenObject, loadingInfoMore }) => {
  const [data, setData] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleSelectMessage = (msg) =>
    setSelectedMessage(msg === selectedMessage ? null : msg);

  return (
    <StyledChat>
      <Header onCloseChat={onClose} rieltor={rieltor} />
      <Content
        data={data}
        onOpenObject={onOpenObject}
        loadingInfoMore={loadingInfoMore}
        selected={selectedMessage}
        onSelect={handleSelectMessage}
        rieltorName={rieltor?.name ?? "Рієлтор"}
      />
      <Footer
        onRefreshData={() => null}
        selectedMessage={selectedMessage}
        onCloseSelectedMessage={() => setSelectedMessage(null)}
        rieltorName={rieltor?.name ?? "Рієлтор"}
      />
    </StyledChat>
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
