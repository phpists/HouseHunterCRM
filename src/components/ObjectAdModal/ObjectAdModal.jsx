import styled from "styled-components";
import { CloseButton } from "./CloseButton";
import { Title } from "./Title";
import { Header } from "./Header/Header";
import { Platforms } from "./Platforms/Platforms";
import { Info } from "./Info/Info";
import { useEffect, useState } from "react";

export const ObjectAdModal = ({ onClose, object }) => {
  const [data, setData] = useState({
    title: "",
    desciption: "",
  });

  const handleChangeField = (field, value) =>
    setData({ ...data, [field]: value });

  useEffect(() => {
    setData({
      title: object?.title ?? "",
      description: object?.description?.replaceAll("<br />", "\n") ?? "",
    });
  }, [object]);

  return (
    <StyledObjectAdModal>
      <div className="modal-wrapper">
        <CloseButton onClick={onClose} />
        <Title />
        <Header />
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
