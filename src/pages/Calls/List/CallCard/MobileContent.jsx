import styled from "styled-components";
import { Type } from "./Type/Type";
import { Phones } from "./Phones/Phones";
import { Agent } from "./Agent/Agent";
import { Field } from "../../../../components/Field";
// import { MoreButton } from "./MoreButton/MoreButton";
import { PhonesMobile } from "./PhonesMobile/PhonesMobile";
import { ShowMore } from "./ShowMore/ShowMore";

export const MobileContent = ({
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
  onAdd,
  onSend,
  onEditComment,
  onSendCall,
  clientName,
  agentPhone,
  callCount,
  clientId,
  commentDate,
  telegram,
  downloadLink,
  idObject,
  onChangeHistoryOrderStatus,
  xcorp,
  onEditHistoryComment,
  companyName,
}) => (
  <StyledMobileContent className="flex flex-col items-start clickable">
    <Type
      callType={callType}
      agentPhone={agentPhone}
      telegram={telegram || xcorp}
    />
    <div className="phones-mobile-wrapper w-full">
      <Phones
        open={open}
        onToggleOpen={onToggleOpen}
        phone={phone}
        date={date}
        callsData={callsData}
        clientName={clientName}
        callCount={callCount}
        telegram={telegram}
        onChangeHistoryOrderStatus={onChangeHistoryOrderStatus}
        xcorp={xcorp}
        onEditHistoryComment={onEditHistoryComment}
      />
      <PhonesMobile
        open={open}
        onToggleOpen={onToggleOpen}
        phone={phone}
        date={date}
      />
    </div>
    <div
      className={`footer-mobile-content ${
        telegram || (xcorp && "footer-telegram")
      }`}
    >
      {telegram || xcorp ? null : (
        <Agent name={name} photo={photo} workerLevel={level} />
      )}
      <Field
        placeholder="Почніть писати"
        label={`Коментар ${commentDate ?? ""}`}
        className="comment"
        full
        value={comment}
        onChange={onChangeComment}
        onSubmit={onSubmitComment}
        viewOnly
        onClick={onEditComment}
      />
    </div>
    <ShowMore
      status={status}
      onSetStatus={onSetStatus}
      onAdd={onAdd}
      onSend={onSend}
      onEditComment={onEditComment}
      onSendCall={onSendCall}
      clientId={clientId}
      telegram={telegram}
      downloadLink={downloadLink}
      idObject={idObject}
      xcorp={xcorp}
    />
  </StyledMobileContent>
);

const StyledMobileContent = styled.div`
  .comment {
    width: 100%;
    height: 60px;
    background: var(--card-bg-3);
    .value {
      max-width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &:hover {
      background: var(--bg-10);
    }
  }
  .footer-mobile-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 10px;
    width: 100%;
    &.footer-telegram {
      grid-template-columns: 1fr;
      width: 98.6%;
    }
  }
  @media (min-width: 1400px) {
    display: none;
  }
  @media (max-width: 600px) {
    .footer-mobile-content {
      grid-template-columns: 1fr;
      gap: 4px;
    }
  }
`;
