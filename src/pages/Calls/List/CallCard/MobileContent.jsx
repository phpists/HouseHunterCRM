import styled from "styled-components";
import { Type } from "./Type/Type";
import { Divider } from "./Divider";
import { Phones } from "./Phones/Phones";
import { Agent } from "./Agent/Agent";
import { Field } from "../../../../components/Field";
import { Status } from "./Status/Status";
import { MoreButton } from "./MoreButton/MoreButton";
import { PhonesMobile } from "./PhonesMobile/PhonesMobile";

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
}) => (
  <StyledMobileContent className="flex flex-col items-start clickable">
    <Type callType={callType} />
    <div className="phones-mobile-wrapper w-full">
      <Phones
        open={open}
        onToggleOpen={onToggleOpen}
        phone={phone}
        date={date}
        callsData={callsData}
      />
      <PhonesMobile
        open={open}
        onToggleOpen={onToggleOpen}
        phone={phone}
        date={date}
      />
    </div>
    <div className="footer-mobile-content">
      <Agent name={name} photo={photo} level={level} />
      <Field
        placeholder="Почніть писати"
        label="Коментар"
        className="comment"
        full
        value={comment}
        onChange={onChangeComment}
        onSubmit={onSubmitComment}
      />
    </div>
    <MoreButton
      openMore={openMore}
      onOpenMore={onOpenMore}
      status={status}
      onSetStatus={onSetStatus}
    />
  </StyledMobileContent>
);

const StyledMobileContent = styled.div`
  .comment {
    width: 100%;
    height: 60px;
    background: #444;
  }
  .footer-mobile-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 10px;
    width: 100%;
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
