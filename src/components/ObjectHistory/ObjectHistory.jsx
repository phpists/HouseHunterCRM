import styled from "styled-components";
import { Modal } from "../Modal/Modal";
import { Card } from "./Card";
import {
  useGetCommentsToFieldsQuery,
  useLazyShowHistoryTagsQuery,
  useLazyShowStreetBaseHistoryTagsQuery,
} from "../../store/objects/objects.api";
import { useEffect, useRef, useState } from "react";
import { checkIsArray, handleFormatDate, handleResponse } from "../../utilits";

export const ObjectHistory = ({ onClose, object }) => {
  const [data, setData] = useState(null);
  const [getHistory] = useLazyShowHistoryTagsQuery();
  const [getStreetBaseHistory] = useLazyShowStreetBaseHistoryTagsQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

  useEffect(() => {
    getHistory(object?.id).then((resp) => setData(resp?.data?.data ?? []));
  }, [object]);

  return (
    <StyledObjectHistory>
      <Modal onClose={onClose} title="Історія тегів">
        <div className="object-history-wrapper">
          {data?.length === 0 || !data ? (
            <div className="empty">Пусто</div>
          ) : (
            <div className="object-history-cards">
              {checkIsArray([...data])
                ?.reverse()
                ?.map(({ action, label, name, tag, user_name, time }, i) => (
                  <Card
                    key={i}
                    title={name ?? user_name}
                    date={
                      time ? handleFormatDate(time * 1000, true) : undefined
                    }
                    //   hours="11:01"
                    tagName={commentsToFields?.object[tag ?? label] ?? "-"}
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
