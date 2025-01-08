import styled from "styled-components";
import { Comments } from "./Comments";
import { CopyLink } from "../../../../../components/CopyLink";

export const Buttons = ({ onOpenChat, idGroup, isNewMessage }) => (
  <StyledButtons className="flex item-center bts">
    <CopyLink
      className="copy-btn"
      link={`http://selection.cars.xcorp.com.ua/?id=${idGroup}`}
    />
    <Comments onClick={onOpenChat} isNewMessage={isNewMessage} />
  </StyledButtons>
);

const StyledButtons = styled.div`
  /* margin-top: -48px; */
  .copy-btn {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--btn-transparent-bg);
    transition: all 0.3s;
    margin-right: 4px;
    padding: 4px;
  }
`;
