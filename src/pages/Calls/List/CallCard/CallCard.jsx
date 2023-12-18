import styled from "styled-components";
import { useEffect, useState } from "react";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";

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

  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  const handleSubmitComment = () => {
    onAddComment(commentEdit);
    setCommentEdit(comment);
  };

  useEffect(() => {
    setCommentEdit(comment);
  }, [comment]);

  return (
    <StyledCallCard
      className=" clickable"
      onClick={handleClick}
      selected={selected}
    >
      <DesktopContent
        open={open}
        onToggleOpen={() => setOpen(!open)}
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
      />
      <MobileContent
        open={open}
        onToggleOpen={() => setOpen(!open)}
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
