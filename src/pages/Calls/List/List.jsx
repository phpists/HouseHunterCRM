import styled from "styled-components";
import { CallCard } from "./CallCard/CallCard";
import { useState } from "react";
import { handleFormatDate } from "../../../utilits";

import { Empty } from "../../../components/Empty";
import { Loader } from "../../../components/Loader";
import { SendModal } from "../../Clients/SendModal";
import { EditComment } from "./EditComment";
import { AddClient } from "../../../components/AddClient/AddClient";
import { SendCall } from "./SendCall";

export const List = ({
  selected,
  onSelect,
  data,
  onSetStatus,
  onAddComment,
  listRef,
  loading,
  onSendSuccess,
  onAddClient,
  telegramData,
  showTelegram,
  refreshTelegramCalls,
}) => {
  const [openMore, setOpenMore] = useState(null);
  const [commentModal, setCommentModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [sendCall, setSendCall] = useState(false);
  const [sendTelegramCall, setSendTelegramCall] = useState(false);

  const handleSendTelegramCall = (id) => {
    setSendCall(id);
    setSendTelegramCall(true);
  };

  const handleCloseSendModal = () => {
    setSendCall(false);
    setSendTelegramCall(null);
  };

  const handleCreateTelegramCommentInfo = (data) => {
    const FIELDS_NAMES = {
      description: "Опис",
      rooms: "Кількість кімнат",
      floor: "Повер",
      floor_count: "Поверховість",
      id_location: "Локація",
      type_deal: "Оренда",
      adress: "Адреса",
      price_usd: "Ціна $",
      other_pay: "Інші платежі",
    };
    const fieldsValues = Object.entries(data)
      ?.filter((f) => !!FIELDS_NAMES[f[0]] && f[1]?.length > 0)
      ?.map((f) => `${FIELDS_NAMES[f[0]]}: ${f[1]}`)
      ?.join("\n\n");

    return fieldsValues?.length > 0 ? fieldsValues : "-";
  };

  return (
    <StyledList ref={listRef}>
      {sendCall && (
        <SendCall
          onClose={handleCloseSendModal}
          callId={sendCall}
          onSendSuccess={() => {
            sendTelegramCall
              ? refreshTelegramCalls()
              : onSendSuccess([sendCall]);
            handleCloseSendModal();
          }}
          telegram={sendTelegramCall}
        />
      )}
      {commentModal && (
        <EditComment
          call={commentModal}
          onClose={() => setCommentModal(false)}
          onChange={onAddComment}
        />
      )}
      {sendModal && (
        <SendModal
          clients={[sendModal]}
          onClose={() => setSendModal(false)}
          onSendSuccess={() => {
            onSendSuccess([sendModal]);
            setSendModal(false);
          }}
        />
      )}
      {addModal && (
        <AddClient
          onClose={() => setAddModal(false)}
          initPhone={addModal?.phone_call}
          callId={addModal?.id}
          onAdded={onAddClient}
        />
      )}
      {data?.length === 0 &&
      (telegramData?.length === 0 || !showTelegram || !telegramData) ? (
        <Empty loading={loading} />
      ) : (
        <>
          {!showTelegram
            ? null
            : telegramData?.map(
                ({
                  user_name,
                  phone,
                  dt_order,
                  filters,
                  type_order,
                  id_order,
                  added_object,
                }) => (
                  <CallCard
                    key={id_order}
                    callType="Телеграм"
                    clientName={user_name}
                    phone={phone}
                    date={handleFormatDate(Number(dt_order) * 1000)}
                    comment={handleCreateTelegramCommentInfo(added_object)}
                    status={type_order}
                    telegram
                    onSendCall={() => handleSendTelegramCall(id_order)}
                    selected={!!selected.find((j) => j === id_order)}
                    onSelect={() => onSelect(id_order)}
                    downloadLink={added_object?.link_to_zip}
                    onEditComment={() =>
                      setCommentModal({
                        id: id_order,
                        coment: handleCreateTelegramCommentInfo(added_object),
                        readOnly: true,
                      })
                    }
                  />
                )
              )}
          {data.map(
            (
              {
                id,
                call_type,
                phone_call,
                dt_incoming,
                full_name,
                photo,
                coment,
                status,
                struct_level_user,
                client_id,
                client_first_name,
                client_last_name,
                phone_binotel,
                Count_call,
                type,
                comment_date,
              },
              i
            ) => (
              <CallCard
                key={i}
                selected={!!selected.find((j) => j === id)}
                onSelect={() => onSelect(id)}
                openMore={openMore === id}
                onOpenMore={() => setOpenMore(openMore === id ? null : id)}
                callType={call_type}
                phone={phone_call}
                agentPhone={phone_binotel}
                date={handleFormatDate(Number(dt_incoming) * 1000)}
                name={full_name}
                photo={photo}
                comment={coment}
                status={status}
                clientName={
                  type?.type_agent
                    ? type?.type_agent
                    : client_id
                    ? `${client_first_name ?? "-"} ${client_last_name}`
                    : null
                }
                onSetStatus={() => onSetStatus(id, status === "1" ? "0" : "1")}
                onAddComment={(comment) => onAddComment(id, comment)}
                level={struct_level_user}
                onEditComment={() => setCommentModal({ id, coment })}
                onAdd={() => setAddModal({ phone_call, id })}
                onSend={client_id ? () => setSendModal(client_id) : null}
                onSendCall={client_id ? null : () => setSendCall(id)}
                id={id}
                callCount={Count_call}
                clientId={client_id}
                commentDate={comment_date}
              />
            )
          )}
        </>
      )}
      <div className="loader relative">
        {loading && data?.length > 0 && (
          <div className="loading-more">
            <Loader white />
          </div>
        )}
      </div>
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  height: calc(100svh - 225px);
  overflow: auto;
  gap: 10px;
  @media (max-width: 600px) {
    height: calc(100svh - 232px);
  }
`;
