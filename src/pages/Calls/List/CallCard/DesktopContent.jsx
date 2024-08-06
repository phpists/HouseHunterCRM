import styled from "styled-components";
import { Type } from "./Type/Type";
import { Divider } from "./Divider";
import { Phones } from "./Phones/Phones";
import { Agent } from "./Agent/Agent";
import { Field } from "../../../../components/Field";
import { Status } from "./Status/Status";
import { ShowMore } from "./ShowMore/ShowMore";

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
  callsData,
  onEditComment,
  onAdd,
  onSend,
  onSendCall,
  clientName,
  agentPhone,
  callCount,
  clientId,
  commentDate,
  telegram,
  downloadLink,
}) => (
  <StyledDesktopContent className="flex items-start clickable">
    <Type callType={callType} agentPhone={agentPhone} telegram={telegram} />
    <Divider />
    <Phones
      open={open}
      onToggleOpen={onToggleOpen}
      phone={phone}
      date={date}
      callsData={callsData}
      clientName={clientName}
      callCount={callCount}
      telegram={telegram}
    />
    <Divider />
    <Status status={status} telegram={telegram} />
    <Field
      placeholder="Почніть писати"
      label={`Коментар ${commentDate ?? ""}`}
      className={`comment ${telegram && "comment-telegram"}`}
      full
      value={comment}
      onChange={onChangeComment}
      onSubmit={onSubmitComment}
      viewOnly
      onClick={onEditComment}
    />
    <Divider />
    {telegram ? null : <Agent name={name} photo={photo} workerLevel={level} />}
    <ShowMore
      status={status}
      onSetStatus={onSetStatus}
      onEditComment={onEditComment}
      onAdd={onAdd}
      onSend={onSend}
      onSendCall={onSendCall}
      clientId={clientId}
      telegram={telegram}
      downloadLink={downloadLink}
    />
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  justify-content: space-between;
  .comment {
    width: 200px;
    height: 60px;
    background: var(--card-bg-3);
    .field-content {
      width: 70%;
    }
    .value {
      max-width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &-telegram {
      width: 25vw !important;
      max-width: 400px;
      flex-shrink: 1;
    }
    &:hover {
      background: var(--bg-10);
    }
  }

  @media (max-width: 1399.9px) {
    display: none;
  }
  @media (min-width: 1600px) {
    .comment {
      width: 254px;
    }
  }
  @media (min-width: 1700px) {
    .comment {
      width: 20svw;
    }
  }
`;
