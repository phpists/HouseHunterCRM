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
}) => (
  <StyledDesktopContent className="flex items-start clickable">
    <Type callType={callType} />
    <Divider />
    <Phones
      open={open}
      onToggleOpen={onToggleOpen}
      phone={phone}
      date={date}
      callsData={callsData}
      clientName={clientName}
    />
    <Divider />
    <Status status={status} />
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
    <Agent name={name} photo={photo} workerLevel={level} />
    <ShowMore
      status={status}
      onSetStatus={onSetStatus}
      onEditComment={onEditComment}
      onAdd={onAdd}
      onSend={onSend}
      onSendCall={onSendCall}
    />
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  justify-content: space-between;
  .comment {
    width: 200px;
    height: 60px;
    background: #444;
    .field-content {
      width: 70%;
    }
    .value {
      max-width: 100px;
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
