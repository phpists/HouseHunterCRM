import styled from "styled-components";
import { Type } from "./Type/Type";
import { Divider } from "./Divider";
import { Phones } from "./Phones/Phones";
import { Agent } from "./Agent/Agent";
import { Field } from "../../../../components/Field";
import { Status } from "./Status/Status";
import { MoreButton } from "./MoreButton/MoreButton";

export const DesktopContent = ({
  open,
  onToggleOpen,
  openMore,
  onOpenMore,
  callType,
  phone,
  date,
  name,
  photo,
  comment,
  onChangeComment,
  status,
  onSetStatus,
  onSubmitComment,
  level,
}) => (
  <StyledDesktopContent className="flex items-start clickable">
    <Type callType={callType} />
    <Divider />
    <Phones open={open} onToggleOpen={onToggleOpen} phone={phone} date={date} />
    <Divider />
    <Agent name={name} photo={photo} level={level} />
    <Divider />
    <Field
      placeholder="Почніть писати"
      label="Коментар"
      className="comment"
      full
      value={comment}
      onChange={onChangeComment}
      onSubmit={onSubmitComment}
    />
    <Divider />
    <Status status={status} />
    <MoreButton
      openMore={openMore}
      onOpenMore={onOpenMore}
      status={status}
      onSetStatus={onSetStatus}
    />
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  justify-content: space-between;
  .comment {
    width: 150px;
    height: 60px;
    background: #444;
    .field-content {
      width: 70%;
    }
  }

  @media (max-width: 1399.9px) {
    display: none;
  }
  @media (min-width: 1600px) {
    .comment {
      width: 204px;
    }
  }
  @media (min-width: 1700px) {
    .comment {
      width: 15svw;
    }
  }
`;
