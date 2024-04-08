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
}) => {
  const [openMore, setOpenMore] = useState(null);
  const [commentModal, setCommentModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [sendCall, setSendCall] = useState(false);

  return (
    <StyledList ref={listRef}>
      {sendCall && (
        <SendCall
          onClose={() => setSendCall(false)}
          callId={sendCall}
          onSendSuccess={() => {
            onSendSuccess([sendCall]);
            setSendCall(false);
          }}
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
        <AddClient onClose={() => setAddModal(false)} initPhone={addModal} />
      )}
      {data?.length === 0 ? (
        <Empty loading={loading} />
      ) : (
        data.map(
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
                client_id
                  ? `${client_first_name ?? "-"} ${client_last_name}`
                  : null
              }
              onSetStatus={() => onSetStatus(id, status === "1" ? "0" : "1")}
              onAddComment={(comment) => onAddComment(id, comment)}
              level={struct_level_user}
              onEditComment={() => setCommentModal({ id, coment })}
              onAdd={() => setAddModal(phone_call)}
              onSend={client_id ? () => setSendModal(client_id) : null}
              onSendCall={client_id ? null : () => setSendCall(id)}
              id={id}
              callCount={Count_call}
              clientId={client_id}
            />
          )
        )
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
