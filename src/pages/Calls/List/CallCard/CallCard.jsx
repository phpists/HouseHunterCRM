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
}) => {
  const [open, setOpen] = useState();
  const [commentEdit, setCommentEdit] = useState(comment);
  const [getCalls, { data: callsData }] = useLazyGetAllCallsPhonesQuery();

  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  const handleSubmitComment = () => {
    onAddComment(commentEdit);
    setCommentEdit(comment);
  };

  useEffect(() => {
    setCommentEdit(comment);
  }, [comment]);

  const handleToggleOpen = () => {
    if (!open) {
      getCalls(phone).then((resp) =>
        handleResponse(resp, () => {
          setOpen(true);
        })
      );
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
      />
    </StyledCallCard>
  );
};

const StyledCallCard = styled.div`
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  background: #3d3d3d;
  border: 1px solid rgba(255, 255, 255, 0);
  transition: all 0.3s;
  position: relative;
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  ${({ selected }) =>
    selected &&
    `
      border: 1px solid rgba(255, 255, 255, 1) !important;
  `}

  @media (max-width:1500px) {
    padding: 10px;
  }
`;
