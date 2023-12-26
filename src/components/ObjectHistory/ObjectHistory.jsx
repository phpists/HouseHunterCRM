import styled from "styled-components";
import { Modal } from "../Modal/Modal";
import { Card } from "./Card";
import {
  useGetCommentsToFieldsQuery,
  useLazyShowHistoryTagsQuery,
} from "../../store/objects/objects.api";
import { useEffect, useRef } from "react";

export const ObjectHistory = ({ onClose, idObject }) => {
  const [getHistory, { data }] = useLazyShowHistoryTagsQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

  useEffect(() => {
    getHistory(idObject);
  }, [idObject]);

  return (
    <StyledObjectHistory>
      <Modal onClose={onClose} title="Історія тегів">
        <div className="object-history-wrapper">
          {data?.length === 0 ? (
            <div className="empty">Пусто</div>
          ) : (
            <div className="object-history-cards">
              {data?.map(({ action, label, name }, i) => (
                <Card
                  key={i}
                  title={name}
                  //   date="15:12:2023"
                  //   hours="11:01"
                  tagName={commentsToFields?.object[label] ?? "-"}
                  action={action === "add"}
                />
              ))}
            </div>
          )}
        </div>
      </Modal>
    </StyledObjectHistory>
  );
};

const StyledObjectHistory = styled.div`
  .object-history-wrapper {
    max-height: 60vh;
    overflow: auto;
  }
  .object-history-cards {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 15px 24px;
    position: relative;
    &::before {
      content: "";
      width: 1px;
      background: rgba(255, 255, 255, 0.1);
      position: absolute;
      left: 7px;
      top: 0;
      bottom: 0;
      display: block;
    }
    .icon {
      background: #2b2b2b;
      border: 2px solid #2b2b2b;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      z-index: 12;
      border-radius: 100%;
    }
  }
  .empty {
    color: rgba(255, 255, 255, 0.9);
    font-family: Overpass;
    font-size: 18px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 4px;
    text-align: center;
  }
`;
