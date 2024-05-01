import styled from "styled-components";
import { useEffect, useState } from "react";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import { useLazyGetAllCallsPhonesQuery } from "../../../../store/calls/calls.api";
import { handleResponse } from "../../../../utilits";

export const CallCard = ({
  selected,
  onSelect,
  openMore,
  onOpenMore,
  callType,
  phone,
  date,
  name,
  photo,
  comment,
  status,
  onSetStatus,
  onAddComment,
  level,
  onEditComment,
  onAdd,
  onSend,
  onSendCall,
  clientName,
  agentPhone,
  id,
  callCount,
  clientId,
  commentDate,
}) => {
  const [open, setOpen] = useState();
  const [commentEdit, setCommentEdit] = useState(comment);
  const [getCalls, { data: callsData }] = useLazyGetAllCallsPhonesQuery();

  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  const handleSubmitComment = () => {
    if (commentEdit !== comment) {
      onAddComment(commentEdit);
      setCommentEdit(comment);
    }
  };

  useEffect(() => {
    setCommentEdit(comment);
  }, [comment]);

  const handleToggleOpen = () => {
    if (!open) {
      if (!callsData) {
        getCalls(phone).then((resp) =>
          handleResponse(resp, () => {
            setOpen(true);
          })
        );
      } else {
        setOpen(true);
      }
    } else {
      setOpen(!open);
    }
  };

  return (
    <StyledCallCard
      className=" clickable"
      onClick={handleClick}
      selected={selected}
    >
      <DesktopContent
        open={open}
        onToggleOpen={handleToggleOpen}
        openMore={openMore}
        onOpenMore={onOpenMore}
        callType={callType}
        phone={phone}
        date={date}
        name={name}
        photo={photo}
        comment={commentEdit}
        onChangeComment={(val) => setCommentEdit(val)}
        onSubmitComment={handleSubmitComment}
        status={status}
        onSetStatus={onSetStatus}
        level={level}
        callsData={callsData?.data ?? []}
        onEditComment={onEditComment}
        onAdd={onAdd}
        onSend={onSend}
        onSendCall={onSendCall}
        clientName={clientName}
        agentPhone={agentPhone}
        callCount={callCount}
        clientId={clientId}
        commentDate={commentDate}
      />
      <MobileContent
        open={open}
        onToggleOpen={handleToggleOpen}
        openMore={openMore}
        onOpenMore={onOpenMore}
        callType={callType}
        phone={phone}
        date={date}
        name={name}
        photo={photo}
        comment={commentEdit}
        onChangeComment={(val) => setCommentEdit(val)}
        onSubmitComment={handleSubmitComment}
        status={status}
        onSetStatus={onSetStatus}
        level={level}
        callsData={callsData?.data ?? []}
        onEditComment={onEditComment}
        onAdd={onAdd}
        onSend={onSend}
        onSendCall={onSendCall}
        clientName={clientName}
        agentPhone={agentPhone}
        callCount={callCount}
        clientId={clientId}
        commentDate={commentDate}
      />
    </StyledCallCard>
  );
};

const StyledCallCard = styled.div`
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0);
  transition: all 0.3s;
  position: relative;
  &:hover {
    border: var(--second-color-border);
  }

  ${({ selected }) =>
    selected &&
    `
      border: 1px solid var(--color-2) !important;
  `}

  @media (max-width:1500px) {
    padding: 10px;
  }
`;
