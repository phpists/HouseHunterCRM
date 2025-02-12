import styled from "styled-components";
import { Modal } from "../../../components/Modal/Modal";
import { ReactComponent as Copy } from "../../../assets/images/copy.svg";
import { useState } from "react";
import { useAppSelect } from "../../../hooks/redux";
import { handleCopy } from "../../../utilits";

export const ReferalModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelect((state) => state.auth);

  const handleCopyAnimation = () => {
    setCopied(true);
    handleCopy(`https://house-hunter.info/auth?id=${user?.id_hash_director}`);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleCopyLink = () => {
    handleCopyAnimation();
  };

  return (
    <StyledReferalModal>
      <Modal
        title={`Отримайте вигоду від реферальної програми \n "House Hunter"`}
        onClose={onClose}
      >
        <div className="subtitle">
          Поділіться своїм досвідом користування нашим програмним забезпеченням
          зі своїми колегами та <b>отримайте</b> одноразову{" "}
          <b>винагороду у розмірі 100%</b> з першого поповнення рахунку ними на
          свій аккаунт.
        </div>
        <div className="label">Реферальне посилання</div>
        <div
          className={`flex items-center justify-between link-wrapper ${
            copied && "active"
          }`}
          onClick={handleCopyLink}
        >
          <span>
            {window.location.origin}/auth?id={user?.id_hash_director}
          </span>
          <Copy />
        </div>
        <div className="label mb-0">
          Для цього просто хай зареєструються за цим посиланням ;)
        </div>
      </Modal>
    </StyledReferalModal>
  );
};

const StyledReferalModal = styled.div`
  .subtitle {
    margin-bottom: 24px;
    color: var(--main-color);
    font-size: 15px;
    font-weight: 100;
    line-height: 17.7px;
    letter-spacing: 0.02em;
    text-align: left;
  }
  .label {
    font-family: Overpass;
    font-size: 15px;
    font-weight: var(--font-weight-200);
    line-height: 17.7px;
    letter-spacing: 0.02em;
    text-align: left;
    color: var(--color-40-rgb);
    margin-bottom: 14px;
    &.mb-0 {
      margin-bottom: 0;
    }
  }
  .link-wrapper {
    margin-bottom: 14px;
    padding: 10px 10px 14px;
    background: var(--input-bg);
    border-radius: 6px;
    border: 1px solid #5d63ff;
    font-size: 14px;
    font-weight: var(--font-weight-200);
    line-height: 16.8px;
    text-align: left;
    color: var(--main-color);
    cursor: pointer;
    transition: all 0.3s;
    span {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    path,
    g {
      transition: all 0.3s;
    }

    &.active {
      border: 1px solid var(--green-bg);
      path {
        fill: var(--green-bg);
      }
    }
  }
`;
