import { styled } from "styled-components";
import { ReactComponent as MessageIcon } from "../../../../../../assets/images/message.svg";
import { IconButton } from "../../../../../../components/IconButton";
import { useState } from "react";
import { Message } from "./Message";

export const ClientPaid = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledClientPaid className="flex items-center justify-between">
      <Message open={open} onClose={() => setOpen(false)} />
      <div>
        <div className="value">6 000₴</div>
        <div className="label">Клієнт дав</div>
      </div>
      <IconButton
        Icon={MessageIcon}
        onClick={() => setOpen(true)}
        className="message-icon"
      />
    </StyledClientPaid>
  );
};

const StyledClientPaid = styled.div`
  border-radius: 9px;
  padding: 7px 17px 7px 7px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  .value {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .label {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .message-icon {
    border: none !important;
    opacity: 0;
    transform: translateX(-10px);
  }
  &:hover {
    .message-icon {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;
